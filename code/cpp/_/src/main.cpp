#include <array>
#include <curl/curl.h>
#include <fstream>
#include <iostream>
#include <json/json.h>
#include <memory>
#include <regex>
#include <stdexcept>
#include <string>
#include <vector>

struct VideoInfo {
  std::string title;
  std::string description;
  std::string channelTitle;
};

struct FormatInfo {
  std::string format_id;
  std::string extension;
  std::string resolution;
};

size_t WriteCallback(void *contents, size_t size, size_t nmemb, void *userp) {
  ((std::string *)userp)->append((char *)contents, size * nmemb);
  return size * nmemb;
}

std::vector<std::string> readUrlsFromFile(const std::string &filename) {
  std::vector<std::string> urls;
  std::ifstream file(filename);
  std::string line;
  while (std::getline(file, line)) {
    urls.push_back(line);
  }
  return urls;
}

std::string extractVideoID(const std::string &url) {
  std::regex url_pattern(R"(v=([a-zA-Z0-9_-]+))");
  std::smatch match;
  if (std::regex_search(url, match, url_pattern)) {
    return match[1].str();
  }
  return "";
}

VideoInfo fetchVideoInfo(const std::string &videoID,
                         const std::string &apiKey) {
  CURL *curl;
  CURLcode res;
  std::string readBuffer;

  std::string apiUrl =
      "https://www.googleapis.com/youtube/v3/videos?id=" + videoID +
      "&key=" + apiKey + "&part=snippet";

  curl_global_init(CURL_GLOBAL_DEFAULT);
  curl = curl_easy_init();
  if (curl) {
    curl_easy_setopt(curl, CURLOPT_URL, apiUrl.c_str());
    curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
    curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
    res = curl_easy_perform(curl);
    curl_easy_cleanup(curl);
  }
  curl_global_cleanup();

  Json::Value jsonData;
  Json::Reader jsonReader;
  VideoInfo videoInfo;

  if (jsonReader.parse(readBuffer, jsonData)) {
    videoInfo.title = jsonData["items"][0]["snippet"]["title"].asString();
    videoInfo.description =
        jsonData["items"][0]["snippet"]["description"].asString();
    videoInfo.channelTitle =
        jsonData["items"][0]["snippet"]["channelTitle"].asString();
  }

  return videoInfo;
}

std::vector<FormatInfo> getAvailableFormats(const std::string &videoID) {
  std::vector<FormatInfo> formats;
  std::string url = "https://www.youtube.com/watch?v=" + videoID;
  std::string command = "yt-dlp -F " + url + " 2>&1";

  std::array<char, 128> buffer;
  std::string result;
  std::unique_ptr<FILE, decltype(&pclose)> pipe(popen(command.c_str(), "r"),
                                                pclose);
  if (!pipe) {
    throw std::runtime_error("popen() failed!");
  }
  while (fgets(buffer.data(), buffer.size(), pipe.get()) != nullptr) {
    result += buffer.data();
  }

  std::regex format_pattern(
      R"((\d+)\s+(\w+)\s+\d+\.\d+\w?\s+(\d+p|audio only))");
  std::smatch match;
  std::string::const_iterator searchStart(result.cbegin());

  while (std::regex_search(searchStart, result.cend(), match, format_pattern)) {
    FormatInfo formatInfo;
    formatInfo.format_id = match[1].str();
    formatInfo.extension = match[2].str();
    formatInfo.resolution = match[3].str();
    formats.push_back(formatInfo);
    searchStart = match.suffix().first;
  }

  return formats;
}

int main() {
  std::string filename = "/home/bk/Downloads/cpp/src/urls.txt";
  std::vector<std::string> urls = readUrlsFromFile(filename);
  std::string apiKey =
      "AIzaSyBc9M8S0InonqQ4Il93ry2yExeZOAtMAi0"; // Replace with your YouTube
                                                 // Data API key

  for (const auto &url : urls) {
    std::string videoID = extractVideoID(url);
    if (!videoID.empty()) {
      VideoInfo info = fetchVideoInfo(videoID, apiKey);
      std::cout << "Title: " << info.title << std::endl;

      std::vector<FormatInfo> formats = getAvailableFormats(videoID);
      std::cout << "Available formats:" << std::endl;
      for (const auto &format : formats) {
        std::cout << "Format ID: " << format.format_id
                  << ", Extension: " << format.extension
                  << ", Resolution: " << format.resolution << std::endl;
      }
      std::cout << "-----------------------------------" << std::endl;
    } else {
      std::cerr << "Failed to extract video ID from URL: " << url << std::endl;
    }
  }

  return 0;
}
