from kivy.app import App

from views import ReminderAppView
from actions import Actions
from utils import configure_logging


class ReminderApp(App):
    def build(self):
        configure_logging()
        data_manager = Actions("reminders.json")
        return ReminderAppView(data_manager)


if __name__ == "__main__":
    ReminderApp().run()
