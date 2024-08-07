import logging

from kivy.uix.treeview import TreeViewLabel

from logger import configure_logger

logger = configure_logger(__name__, logging.DEBUG)


class PlaylistFileNode(TreeViewLabel):
    def __init__(self, file_info, **kwargs):
        super().__init__(**kwargs)
        self.file_info = file_info
        self.text = file_info['name']
        self.date = file_info['date']
        self.duration = file_info['duration']
        self.path = file_info['path']
