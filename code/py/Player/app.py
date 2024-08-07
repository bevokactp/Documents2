import os
import json
import logging
import subprocess

from kivy.uix.treeview import TreeView, TreeViewLabel
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.slider import Slider
from kivy.uix.popup import Popup
from kivy.uix.filechooser import FileChooserListView
from kivy.core.audio import SoundLoader

# from kivy.uix.label import Label
# from kivy.uix.checkbox import CheckBox
# from kivy.uix.gridlayout import GridLayout

from utils import filter_music_files, PATH_DEFAULT
from playlistFileNode import PlaylistFileNode
from playlistManager import PlaylistManager

# from actions import MediaActions
from logger import configure_logger

logger = configure_logger(__name__, logging.DEBUG)


class MediaPlayer(BoxLayout):
    def __init__(self, **kwargs):
        super(MediaPlayer, self).__init__(**kwargs)
        self.orientation = "vertical"

        # Initialize playlist manager
        self.playlist_manager = PlaylistManager()

        # Layouts
        self.controls_layout = BoxLayout(size_hint_y=None, height="48dp")
        self.playlist_layout = BoxLayout()

        # Controls
        self.play_button = Button(text="Play")
        self.pause_button = Button(text="Pause")
        self.stop_button = Button(text="Stop")
        self.shuffle_button = Button(text="Shuffle")
        self.open_files_button = Button(text="Open Files")
        self.open_dir_button = Button(text="Open Directory")

        # Bindings
        self.play_button.bind(on_press=self.play_media)
        self.pause_button.bind(on_press=self.pause_media)
        self.stop_button.bind(on_press=self.stop_media)
        self.shuffle_button.bind(on_press=self.shuffle_playlist)
        self.open_files_button.bind(on_press=self.open_files)
        self.open_dir_button.bind(on_press=self.open_directory_recursively)

        # Sliders
        self.playtime_slider = Slider(min=0, max=100, value=0)
        self.volume_slider = Slider(min=0, max=100, value=50)

        # Add widgets to layout
        self.controls_layout.add_widget(self.play_button)
        self.controls_layout.add_widget(self.pause_button)
        self.controls_layout.add_widget(self.stop_button)
        self.controls_layout.add_widget(self.shuffle_button)
        self.controls_layout.add_widget(self.open_files_button)
        self.controls_layout.add_widget(self.open_dir_button)
        self.controls_layout.add_widget(self.playtime_slider)
        self.controls_layout.add_widget(self.volume_slider)

        # Add playlist view
        self.playlist_view = TreeView(
            root_options=dict(text="Playlist"), hide_root=True
        )
        self.playlist_layout.add_widget(self.playlist_view)

        # Add layouts to root
        self.add_widget(self.controls_layout)
        self.add_widget(self.playlist_layout)

        # Media variables
        self.current_media = None
        self.sound = None

    def play_media(self, instance):
        if self.sound:
            logger.debug("Playing media")
            self.sound.play()

    def pause_media(self, instance):
        if self.sound:
            logger.debug("Pausing media")
            self.sound.stop()

    def stop_media(self, instance):
        if self.sound:
            logger.debug("Stopping media")
            self.sound.stop()
            self.sound.seek(0)

    def shuffle_playlist(self, instance):
        logger.debug("Shuffling playlist")
        self.playlist_manager.shuffle_playlist()
        self.update_playlist_view()

    def load_media(self, filepath):
        logger.debug(f"Loading media file: {filepath}")
        if self.sound:
            self.sound.stop()
        self.sound = SoundLoader.load(filepath)

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

    def add_file_to_playlist(self, file_path):
        # Extract file info
        file_info = {
            "name": os.path.basename(file_path),
            "path": file_path,
            "duration": self.get_file_duration(file_path),  # Implement this method
            "date": os.path.getmtime(
                file_path
            ),  # Timestamp, convert to readable format if needed
        }

        # Add to playlist
        self.playlist_manager.add_to_playlist(file_path)
        node = PlaylistFileNode(file_info=file_info, text=file_info["name"])
        self.playlist_view.add_node(node)
        logger.debug(f"Added {file_path} to playlist")


    def open_directory_recursively(self, instance):
        filechooser = FileChooserListView(
            dirselect=True, multiselect=True, path=PATH_DEFAULT
        )
        self.dirchooser_popup = Popup(title="Choose directory", size_hint=(0.9, 0.9))
        layout = BoxLayout(orientation="vertical")
        layout.add_widget(filechooser)

        confirm_button = Button(text="Confirm", size_hint_y=None, height="40dp")
        confirm_button.bind(
            on_press=lambda btn: self.confirm_directory(filechooser, btn)
        )
        layout.add_widget(confirm_button)

        # Установка содержимого Popup и его открытие
        self.dirchooser_popup.content = layout
        self.dirchooser_popup.open()

    def open_files(self, instance):
        filechooser = FileChooserListView(multiselect=True, path="/home/bk/Downloads")

        self.filechooser_popup = Popup(title="Choose files", size_hint=(0.9, 0.9))

        layout = BoxLayout(orientation="vertical")
        layout.add_widget(filechooser)

        confirm_button = Button(text="Confirm", size_hint_y=None, height="40dp")
        confirm_button.bind(on_press=lambda btn: self.confirm_files(filechooser, btn))
        layout.add_widget(confirm_button)

        # Установка содержимого Popup и его открытие
        self.filechooser_popup.content = layout
        self.filechooser_popup.open()

    def update_playlist_view(self):
        self.playlist_view.clear_widgets()

        # Add each item in the playlist to TreeView
        for file in self.playlist_manager.playlist:
            filename = os.path.basename(file)
            tree_item = TreeViewLabel(text=filename)
            self.playlist_view.add_node(tree_item)

    def confirm_files(self, filechooser, instance):
        selected_files = filter_music_files(filechooser.selection)
        logger.debug(f"Files selected: {selected_files}")

        for file in selected_files:
            if file not in self.playlist_manager.playlist:
                self.playlist_manager.add_to_playlist(file)
                logger.debug(f"Added {file} to playlist")
            else:
                logger.debug(f"{file} already in playlist")

        self.filechooser_popup.dismiss()

    def confirm_directory(self, filechooser, instance):
        selected_dirs = filechooser.selection
        logging.debug(f"Directories selected: {selected_dirs}")

        for dir in selected_dirs:
            all_files = [
                os.path.join(root, file)
                for root, _, files in os.walk(dir)
                for file in files
            ]
            music_files = filter_music_files(all_files)

            for file in music_files:
                if file not in self.playlist_manager.playlist:
                    self.playlist_manager.add_to_playlist(file)
                    logging.debug(f"Added {file} to playlist")
                else:
                    logging.debug(f"{file} already in playlist")

        self.dirchooser_popup.dismiss()
