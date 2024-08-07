
from kivy.app import App

from app import MediaPlayer


class MediaPlayerApp(App):
    def build(self):
        return MediaPlayer()


if __name__ == "__main__":
    MediaPlayerApp().run()
