import os


PATH_DEFAULT = "/home/bk/"
FILENAME_PLAYLIST = "playlist.json"
EXTENSIONS_SUPPORTED = ['.mp3', '.wav', '.mp4', '.m4a']


def filter_music_files(files):
    return [file for file in files if os.path.splitext(file)[1].lower() in EXTENSIONS_SUPPORTED]


def load_media_files(self, directory):
    media_files = []
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith(EXTENSIONS_SUPPORTED):
                media_files.append(os.path.join(root, file))
    return media_files
