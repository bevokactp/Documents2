from kivy.uix.boxlayout import BoxLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput
from kivy.uix.checkbox import CheckBox
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.scrollview import ScrollView

import logging
from datetime import datetime

from utils import configure_logging
from validators import validate_input_hours_minutes, validate_input_max_length

configure_logging()
logger = logging.getLogger(__name__)

HOUR_MINUTE_DEFAULT = 1


class ReminderAppView(BoxLayout):
    def __init__(self, actions, **kwargs):
        super().__init__(**kwargs)
        self.actions = actions
        self.orientation = "horizontal"
        self._create_ui()
        self._show_list_reminders()

    def _create_ui(self):
        self._create_left_panel()
        self._create_right_panel()
        self._set_background_color()
        self._configure_bindings()

    def _set_background_color(self):
        pass

    def _configure_bindings(self):
        self.name_input.bind(
            text=lambda instance, value: self._validate_input_max_length(
                instance, value, 20
            )
        )
        self.start_time_hour.bind(
            text=lambda instance, value: self._validate_input_hours(instance, value)
        )
        self.interval_hour.bind(
            text=lambda instance, value: self._validate_input_hours(instance, value)
        )
        self.start_time_minute.bind(
            text=lambda instance, value: self._validate_input_minutes(instance, value)
        )
        self.interval_minute.bind(
            text=lambda instance, value: self._validate_input_minutes(instance, value)
        )

        self.add_button.bind(on_release=self._on_add_button_click)
        self.edit_button.bind(on_release=self._on_edit_button_click)
        self.delete_button.bind(on_release=self._on_delete_button_click)

    def _on_add_button_click(self, instance):
        self.actions.add_reminder(self)

    def _on_edit_button_click(self, instance):
        self.actions.edit_reminder(self)

    def _on_delete_button_click(self, instance):
        self.actions.delete_reminder(self)

    def _create_left_panel(self):
        self.left_panel = BoxLayout(orientation="vertical", size_hint=(0.4, 1))
        self._add_input_fields_to_left_panel()
        self._add_buttons_to_left_panel()
        self.add_widget(self.left_panel)

    def _validate_input_minutes(self, instance, value):
        validate_input_hours_minutes(self, instance, value, 0, 59)

    def _validate_input_hours(self, instance, value):
        validate_input_hours_minutes(self, instance, value, 0, 23)

    def _validate_input_max_length(self, instance, value, max_length):
        validate_input_max_length(self, instance, value, max_length)

    def _add_input_fields_to_left_panel(self):
        layout = GridLayout(cols=1, padding=10, spacing=10, size_hint_y=None)
        layout.bind(minimum_height=layout.setter("height"))

        self.previous_value = HOUR_MINUTE_DEFAULT

        widget_height = 40

        label = Label(text="Name:", size_hint_y=None, height=widget_height)
        self.name_input = TextInput(
            multiline=False,
            size_hint_y=None,
            height=widget_height,
            text="1",
            hint_text="Enter name",
        )

        layout.add_widget(label)
        layout.add_widget(self.name_input)

        label = Label(text="Start Time:", size_hint_y=None, height=widget_height)
        start_time_layout = BoxLayout(
            orientation="horizontal", size_hint_y=None, height=widget_height
        )
        self.start_time_hour = TextInput(
            input_filter="int",
            multiline=False,
            size_hint_y=None,
            height=widget_height,
            size_hint_x=0.4,
            text="12",
        )
        self.start_time_minute = TextInput(
            input_filter="int",
            multiline=False,
            size_hint_y=None,
            height=widget_height,
            size_hint_x=0.4,
            text="30",
        )
        start_time_layout.add_widget(self.start_time_hour)
        start_time_layout.add_widget(
            Label(text=":", size_hint_y=None, height=widget_height)
        )
        start_time_layout.add_widget(self.start_time_minute)
        layout.add_widget(label)
        layout.add_widget(start_time_layout)

        label = Label(text="Interval:", size_hint_y=None, height=widget_height)
        interval_layout = BoxLayout(
            orientation="horizontal", size_hint_y=None, height=widget_height
        )
        self.interval_hour = TextInput(
            input_filter="int",
            multiline=False,
            size_hint_y=None,
            height=widget_height,
            size_hint_x=0.4,
            text="1",
        )
        self.interval_minute = TextInput(
            input_filter="int",
            multiline=False,
            size_hint_y=None,
            height=widget_height,
            size_hint_x=0.4,
            text="0",
        )
        interval_layout.add_widget(self.interval_hour)
        interval_layout.add_widget(
            Label(text=":", size_hint_y=None, height=widget_height)
        )
        interval_layout.add_widget(self.interval_minute)
        layout.add_widget(label)
        layout.add_widget(interval_layout)

        checkbox_layout = BoxLayout(orientation="horizontal", size_hint_y=None)
        self.activated = CheckBox(active=1)
        checkbox_layout.add_widget(self.activated)
        checkbox_layout.add_widget(Label(text="Activated"))
        layout.add_widget(checkbox_layout)

        self.left_panel.add_widget(layout)

    def _add_buttons_to_left_panel(self):
        button_layout = BoxLayout(orientation="vertical", spacing=10, padding=10)

        self.add_button = Button(text="Add", background_color=(0.8, 0.4, 0.8, 1))
        self.edit_button = Button(text="Edit", background_color=(0.4, 0.6, 1, 1))
        self.delete_button = Button(text="Delete", background_color=(0.4, 1, 0.4, 1))

        button_layout.add_widget(self.add_button)
        button_layout.add_widget(self.edit_button)
        button_layout.add_widget(self.delete_button)

        self.left_panel.add_widget(button_layout)

    def _create_right_panel(self):
        self.right_panel = BoxLayout(orientation="vertical", size_hint=(0.6, 1))

        self.table = GridLayout(cols=5, size_hint_y=None)
        self.table.bind(minimum_height=self.table.setter("height"))

        scroll_view = ScrollView(size_hint=(1, 1))
        scroll_view.add_widget(self.table)

        self.right_panel.add_widget(scroll_view)
        self.add_widget(self.right_panel)

        self.table.bind(on_touch_down=self._on_row_click_get_id)

    def _show_list_reminders(self):
        self.table.clear_widgets()

        headers = ["Name", "Start Time", "Interval", "Activated", "ID"]
        for header in headers:
            self.table.add_widget(
                Label(text=header, bold=True, size_hint_y=None, height=40)
            )
        reminders = self.actions.get_reminders()
        for reminder in reminders:

            self.table.add_widget(
                Label(text=str(reminder.name), size_hint_y=None, height=40)
            )
            start_time_formatted = (
                reminder.start_time.strftime("%H:%M")
                if isinstance(reminder.start_time, datetime)
                else reminder.start_time
            )
            interval_formatted = (
                reminder.interval.strftime("%H:%M")
                if isinstance(reminder.interval, datetime)
                else reminder.interval
            )
            self.table.add_widget(
                Label(text=start_time_formatted, size_hint_y=None, height=40)
            )
            self.table.add_widget(
                Label(text=interval_formatted, size_hint_y=None, height=40)
            )
            self.table.add_widget(
                Label(
                    text="Yes" if reminder.activated else "No",
                    size_hint_y=None,
                    height=40,
                )
            )
            self.table.add_widget(Label(text=reminder.id_reminder, size_hint_x=0, opacity=0))

    def _on_row_click_get_id(self, instance, touch):
        logger.error("Always return latest value")

        if instance.collide_point(*touch.pos):
            for child in instance.children:
                if child.opacity == 0:
                    row_id = child.text
                    logger.info(f"Selected row ID: {row_id}")
                    self.selected_id = row_id
                    break
