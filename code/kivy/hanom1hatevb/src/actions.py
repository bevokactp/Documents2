import logging
from datetime import datetime

from kivy.storage.jsonstore import JsonStore

from models import Reminder

logger = logging.getLogger(__name__)


class Actions:
    def __init__(self, filename):
        self.store = JsonStore(filename)

    def get_reminders(self):
        reminders = []
        try:
            for key in self.store.keys():
                reminder_data = self.store.get(key)
                reminder = Reminder(
                    name=reminder_data['name'],
                    start_time=datetime.strptime(reminder_data['start_time'], '%H:%M').strftime('%H:%M'),
                    interval=datetime.strptime(reminder_data['interval'], '%H:%M').strftime('%H:%M'),
                    activated=reminder_data['activated'],
                    id_reminder=key
                )
                reminders.append(reminder)
            logger.info("Successfully retrieved reminders from JsonStore.")
        except Exception as e:
            logger.error(f"Error retrieving reminders from JsonStore: {e}")
        return reminders

    def get_next_id(self):
        if not self.store.keys():
            return 1
        return max([int(key) for key in self.store.keys()]) + 1

    def add_reminder(self, view):
        try:
            name = view.name_input.text
            start_time_str = view.start_time_hour.text.zfill(2) + ":" + view.start_time_minute.text.zfill(2)
            interval_str = view.interval_hour.text.zfill(2) + ":" + view.interval_minute.text.zfill(2)
            activated = view.activated.active

            # Validate the input and ensure proper formatting
            start_time = datetime.strptime(start_time_str, '%H:%M').strftime('%H:%M')
            interval = datetime.strptime(interval_str, '%H:%M').strftime('%H:%M')

            # Create a new Reminder instance
            reminder = Reminder(
                name=name,
                start_time=start_time,
                interval=interval,
                activated=activated,
                id_reminder=str(self.get_next_id())
            )

            # Save the Reminder to the store
            self.store.put(reminder.id_reminder, **reminder.to_dict())

            # Log the addition
            logger.info(f"Added reminder: {reminder.to_dict()}")

            view._show_list_reminders()

        except Exception as e:
            logger.error(f"Failed to add reminder: {e}")

    def edit_reminder(self, view):
        pass

    def delete_reminder(self, view, id_reminder):
        try:
            self.store.delete(id_reminder)
            logger.info(f"Deleted reminder with ID: {id_reminder}")
            view._show_list_reminders()
        except Exception as e:
            logger.error(f"Failed to delete reminder: {e}")
