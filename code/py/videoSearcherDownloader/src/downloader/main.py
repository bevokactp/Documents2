
import subprocess
import os
import csv


# Define the directory for downloads
DOWNLOAD_DIR = "/home/bk/Downloads/_downloader"
URLS_FILE = "/home/bk/Documents/code/py/downloader/src/urls.tsv"
if not os.path.exists(DOWNLOAD_DIR):
    os.makedirs(DOWNLOAD_DIR)

SUBTITLES_LANGUAGE_CODE = "ru"
AUDIO_FORMATS = [
    "m4a",
]
VIDEO_FORMATS = [
    "640x360",
    "852x480",
    "720p",
    "1280x720",
]


# Read the URLs and preferences from the tsv file
def read_urls(filename):
    with open(filename, newline="") as tsvfile:
        reader = csv.reader(tsvfile, delimiter="\t")
        urls = [(row[0], row[1]) for row in reader]
    return urls


# Get the video title
def get_video_title(url):
    result = subprocess.run(
        ["yt-dlp", "--get-title", url], capture_output=True, text=True
    )
    return result.stdout.strip()


# Get the available formats for a URL
def get_formats(url):
    formats_result = subprocess.run(
        ["yt-dlp", "-F", url], capture_output=True, text=True
    )
    return formats_result.stdout


def parse_format_output(output):
    formats_output = []
    for row in output.splitlines():
        if (
            not (row.count("|") == 2 or row.count("│") == 2)
            or ("FILESIZE" in row)
            or ("mp4" not in row and "m4a" not in row)
        ):
            continue

        if "|" in row:
            columns = [col for col in row.split("|")]
        else:
            columns = [col for col in row.split("│")]

        column1 = columns[0].strip().split()
        resolution = columns[0].strip().split()[2]
        if "audio" in resolution:
            resolution = "audio only"

        column2 = columns[1].strip().split()
        if len(column2) == 1:
            PROTO = column2[0]
            FILESIZE = ""
            TBR = ""
        else:
            column2 = columns[1].strip().rsplit(" ", 2)
            PROTO = column2[2]
            FILESIZE = column2[0].strip()
            TBR = column2[1]
        column3 = columns[2].strip()

        formats_output.append(
            {
                "ID": column1[0],
                "EXT": column1[1],
                "RESOLUTION": resolution,
                "FILESIZE": FILESIZE,
                "TBR": TBR,
                "PROTO": PROTO,
                "VCODEC": column3[0: column3.find("  ")],
            }
        )
    return formats_output


def parse_size(size_str):
    """Convert file size string to megabytes (MiB) as a float."""
    size_str = size_str.replace("~", "").strip()
    if "GiB" in size_str:
        return float(size_str.replace("GiB", "")) * 1024
    elif "MiB" in size_str:
        return float(size_str.replace("MiB", ""))
    elif "KiB" in size_str:
        return float(size_str.replace("KiB", "")) / 1024
    elif "B" in size_str:
        return float(size_str.replace("B", "")) / (1024 * 1024)
    return 0.0


def find_closest_to_average(sizes):
    sizes_mib = [parse_size(size) for size in sizes]
    average_mib = sum(sizes_mib) / len(sizes_mib)
    closest_size = min(sizes_mib, key=lambda x: abs(x - average_mib))
    return closest_size, average_mib


def choose_best_format_id(formats, is_video):
    if is_video:
        for resolution in VIDEO_FORMATS:
            # Filter formats by the current resolution
            formats_supported = [
                (fmt["ID"], fmt["FILESIZE"], parse_size(fmt["FILESIZE"]))
                for fmt in formats
                if fmt["RESOLUTION"] == resolution
            ]
            if formats_supported:
                sizes = [fmt[1]
                         for fmt in formats_supported]  # Get sizes as strings
                closest_size, average_mib = find_closest_to_average(sizes)
                for fmt_id, _, parsed_size in formats_supported:
                    if parsed_size == closest_size:
                        return fmt_id
        # If no suitable formats found for any resolution
        return None
    else:
        # Handle audio formats
        formats_supported = [
            (fmt["ID"], fmt["FILESIZE"], parse_size(fmt["FILESIZE"]))
            for fmt in formats
            if fmt["EXT"] in AUDIO_FORMATS
        ]
        if formats_supported:
            sizes = [fmt[1]
                     for fmt in formats_supported]  # Get sizes as strings
            closest_size, _ = find_closest_to_average(sizes)
            for fmt_id, _, parsed_size in formats_supported:
                if parsed_size == closest_size:
                    return fmt_id
        return None


def display_info(url, title, formats, best_format_id, is_video):
    # ANSI escape codes for colors
    color_id = "\033[94m"
    color_ext = "\033[92m"
    color_resolution = "\033[93m"
    color_filesize = "\033[95m"
    color_tbr = "\033[96m"
    color_proto = "\033[91m"
    color_vcodec = "\033[90m"
    color_best_choice = "\033[97m"

    print(f"URL: {url}")
    print(f"Title: {title}")
    print(
        f"{color_id}ID                                                 "
        f"| {color_ext} EXT   | {color_resolution}RESOLUTION | "
        f"{color_filesize}FILESIZE   | {color_tbr}TBR   | {color_proto}PROTO   | "
        f"{color_vcodec}VCODEC          | {color_best_choice}choice"
    )
    print("-" * 130)

    for fmt in formats:
        if (not is_video and fmt["EXT"]) in AUDIO_FORMATS or (
            is_video and fmt["RESOLUTION"] in VIDEO_FORMATS
        ):
            best_choice = "@" if fmt["ID"] == best_format_id else ""
            print(
                f"{color_id}{fmt['ID']:<50} | {color_ext}{fmt['EXT']:^6} | {color_resolution}{fmt['RESOLUTION']:<10} | "
                f"{color_filesize}{fmt['FILESIZE']:>10} | {color_tbr}{fmt['TBR']:>5} | {color_proto}{fmt['PROTO']:<7} | "
                f"{color_vcodec}{fmt['VCODEC']:<15} | {color_best_choice}{best_choice}"
            )


def download_file(url, format_id, subtitles_language_code):
    """Download the file using yt-dlp."""
    # Build the command for yt-dlp
    command = [
        "yt-dlp",
        "--format",
        format_id,
        "--sub-lang",
        subtitles_language_code,
        "--write-sub",  # Download subtitles
        "--output",
        os.path.join(DOWNLOAD_DIR, "%(title)s.%(ext)s"),
        url,
    ]

    # Execute the command
    result = subprocess.run(command, capture_output=True, text=True)

    # Check for errors
    if result.returncode == 0:
        print(f"Successfully downloaded: {url}")
    else:
        print(f"Error downloading {url}: {result.stderr}")


def main():
    # DO USE HTTP:// NOT HTTPS://
    urls = read_urls(URLS_FILE)

    for is_video, url in urls:
        title = get_video_title(url)
        formats_output = get_formats(url)
        formats = parse_format_output(formats_output)
        is_video = bool(int(is_video))
        best_format_id = choose_best_format_id(formats, is_video)
        display_info(url, title, formats, best_format_id, is_video)

        if best_format_id:
            download_file(url, best_format_id, SUBTITLES_LANGUAGE_CODE)


if __name__ == "__main__":
    main()
