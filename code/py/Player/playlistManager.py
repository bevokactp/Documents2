import os
import subprocess
import random
import logging
import json


from utils import filter_music_files, FILENAME_PLAYLIST
from logger import configure_logger

logger = configure_logger(__name__, logging.DEBUG)


class PlaylistManager:
    def __init__(self):
        self.playlist = []

    def shuffle_playlist(self):
        random.shuffle(self.playlist)
        logging.debug("Playlist shuffled")

    def get_sorted_playlist(self, column_name):
        # Add sorting logic based on column_name
        pass

    def filter_playlist(self, filter_text):
        # Add filter logic based on filter_text
        pass

    def save_playlist(self, playlist, filename=FILENAME_PLAYLIST):
        with open(filename, "w") as f:
            json.dump(playlist, f)

    def load_playlist(self, filename=FILENAME_PLAYLIST):
        if os.path.exists(filename):
            with open(filename, "r") as f:
                self.playlist = json.load(f)
        return self.playlist

    def add_to_playlist(self, filepath):
        if os.path.isfile(filepath):
            if filepath not in self.playlist:
                self.playlist.append(filepath)
                file_info = {
                    "name": os.path.basename(filepath),
                    "path": filepath,
                    "duration": self.get_file_duration(
                        filepath
                    ),  # Implement this method
                    "date": os.path.getmtime(filepath),  # Timestamp
                }
                logger.debug(f"Added {filepath} to playlist")
            else:
                logger.debug(f"{filepath} already in playlist")

    def delete_from_playlist(self, filepath):
        if filepath in self.playlist:
            self.playlist.remove(filepath)
            logger.debug(f"Removed {filepath} from playlist")

    def get_files_from_directory(self, dirpath):
        files = []
        for root, _, filenames in os.walk(dirpath):
            for file in filenames:
                files.append(os.path.join(root, file))
        return files

    def is_in_playlist(self, file):
        return file in self.playlist

    def add_directory_recursively(self, dirpath):
        new_files = []
        for root, _, files in os.walk(dirpath):
            all_files = [os.path.join(root, file) for file in files]
            music_files = filter_music_files(all_files)

            for file in music_files:
                if file not in self.playlist:
                    new_files.append(file)
                    self.playlist.append(file)  # Add file to playlist
                    file_info = {
                        "name": os.path.basename(file),
                        "path": file,
                        "duration": self.get_file_duration(
                            file
                        ),  # Implement this method
                        "date": os.path.getmtime(file),  # Timestamp
                    }
            logger.debug(
                f"Added {len(new_files)} new music files from directory to playlist"
            )

    def get_file_duration(self, filepath):
        try:
            command = [
                "ffprobe",
                "-v",
                "error",
                "-show_entries",
                "format=duration",
                "-of",
                "json",
                filepath,
            ]
            result = subprocess.run(command, capture_output=True, text=True, check=True)
            data = json.loads(result.stdout)
            duration = float(data["format"]["duration"])
            return duration
        except Exception as e:
            logger.error(f"Error getting duration for {filepath}: {e}")
            return None
