

/*
mint21 cinnamon c++
we have list link on videos youtube
for each determinate format mp4 mp3 m4 avaible for download and size it files
*/

// https://www.youtube.com/watch?v=qjEjHuOU3tw&ab_channel=WorldofWarcraftRU

// #include <iostream>
// #include <fstream>
// #include <string>
// #include <vector>
// #include <cstdlib>
// #include <nlohmann/json.hpp> // JSON library

// using json = nlohmann::json;

// void download_video_info(const std::string &url, const std::string &output_filename)
// {
//     std::string command = "yt-dlp -j " + url + " > " + output_filename;
//     system(command.c_str());
// }

// void parse_and_display_info(const std::string &filename)
// {
//     std::ifstream file(filename);
//     if (!file.is_open())
//     {
//         std::cerr << "Could not open " << filename << " file!" << std::endl;
//         return;
//     }

//     json video_info;
//     file >> video_info;

//     std::cout << "URL: " << video_info["webpage_url"] << std::endl;
//     for (const auto &format : video_info["formats"])
//     {
//         std::string format_id = format["format_id"];
//         std::string format_ext = format["ext"];
//         std::string format_size = format.contains("filesize") ? std::to_string(format["filesize"]) : "unknown";
//         std::cout << "  Format: " << format_id << ", Extension: " << format_ext << ", Size: " << format_size << " bytes" << std::endl;
//     }
// }

// int main()
// {
//     std::string url_file;
//     std::cout << "Enter the filename containing YouTube URLs: ";
//     std::cin >> url_file;

//     std::ifstream infile(url_file);
//     if (!infile.is_open())
//     {
//         std::cerr << "Could not open " << url_file << " file!" << std::endl;
//         return 1;
//     }

//     std::string url;
//     int count = 0;
//     while (std::getline(infile, url))
//     {
//         if (!url.empty())
//         {
//             std::string output_filename = "video_info_" + std::to_string(count++) + ".json";
//             download_video_info(url, output_filename);
//             parse_and_display_info(output_filename);
//         }
//     }

//     return 0;
// }

#include <iostream>
#include <string>
#include <vector>
#include <curl/curl.libcurl.h> // Include CURL for web scraping (if needed)

// Function to process a single video link (illustrative example)
void processVideoLink(const std::string& link) {
    std::cout << "Processing link: " << link << std::endl;

    // Simulate web scraping to get format and size (replace with actual scraping logic)
    std::string format = "MP4"; // Replace with actual format extraction
    int size = 1024; // Replace with actual size extraction (in bytes)

    if (!format.empty() && size > 0) {
        std::cout << "  Available format: " << format << std::endl;
        std::cout << "  Estimated size: " << size << " bytes" << std::endl;
    } else {
        std::cout << "  Unable to determine format or size." << std::endl;
    }
}

int main() {
    std::vector<std::string> videoLinks = {
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Example link
        // Add more video links here
    };

    for (const std::string& link : videoLinks) {
        processVideoLink(link);
    }

    return 0;
}
yy