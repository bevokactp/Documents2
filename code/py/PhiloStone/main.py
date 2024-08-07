import logging
from datetime import datetime, timedelta
from collections import OrderedDict

from kivy.app import App
from kivy.uix.button import Button

from dataManager import DataManager
from logger import configure_logger
from layout import draw_layout

logger = configure_logger(__name__, logging.INFO)

DIR_DATA_PATH = "./data"
FILE_FORMAT = "tsv"
FILE_TEMPLATE_PATH = f"./templateForEveryDay.{FILE_FORMAT}"


class PhiloStoneApp(App):
    def build(self):

        draw_layout(self)

        self.data_manager = DataManager(DIR_DATA_PATH, FILE_TEMPLATE_PATH)

        self.date_first_file_records = (
            self.data_manager.get_date_first_file_in_philo_stone()
        )

        self.update_date_selectors()

        self.load_data(self)

        return self.layout

    def update_month_spinner(self, *args):
        earliest_date = self.date_first_file_records
        current_date = datetime.now()
        selected_year = int(self.year_spinner.text)

        start_month = earliest_date.month if selected_year == earliest_date.year else 1
        end_month = current_date.month if selected_year == current_date.year else 12

        self.month_spinner.values = [
            str(month) for month in range(start_month, end_month + 1)
        ]
        self.month_spinner.text = str(current_date.month)
        self.update_day_spinner()

    def update_day_spinner(self, *args):
        earliest_date = self.date_first_file_records
        current_date = datetime.now()
        selected_year = int(self.year_spinner.text)
        selected_month = int(self.month_spinner.text)

        start_day = 1
        end_day = (
            datetime(selected_year, selected_month + 1, 1) - timedelta(days=1)
        ).day

        if (
            selected_year == earliest_date.year
            and selected_month == earliest_date.month
        ):
            start_day = earliest_date.day
        if selected_year == current_date.year and selected_month == current_date.month:
            end_day = current_date.day

        self.day_spinner.values = [str(day) for day in range(start_day, end_day + 1)]
        self.day_spinner.text = str(current_date.day)

    def update_date_selectors(self):
        current_date = datetime.now()

        self.year_spinner.values = [
            str(year)
            for year in range(self.date_first_file_records.year, current_date.year + 1)
        ]
        self.year_spinner.text = str(current_date.year)

        self.update_month_spinner()
        self.update_day_spinner()

        self.year_spinner.bind(text=self.update_month_spinner)
        self.month_spinner.bind(text=self.update_day_spinner)

    def load_data(self, instance):
        self.data = self.data_manager.load_data(
            self.year_spinner.text, self.month_spinner.text, self.day_spinner.text
        )
        self.updated_data = OrderedDict(self.data.items())
        self.create_tabs()

        file_count = len(self.data_manager.all_tsv_files)
        days_difference = (datetime.now() - self.date_first_file_records).days + 1
        self.file_count_label.text = f"Количество записей: {file_count}"
        self.days_difference_label.text = f"Прошло суток: {days_difference}"

    def create_tabs(self):
        self.tabs_grid.clear_widgets()
        update_tab = Button(
            text="Update",
            size_hint_y=None,
            height=50,
            background_color=(0, 0, 1, 1),
            color=(1, 1, 1, 1),
        )
        update_tab.bind(on_release=self.update_entries)
        self.tabs_grid.add_widget(update_tab)

        for category in self.data.keys():
            tab_button = Button(
                text=category,
                size_hint_y=None,
                height=50,
                background_color=(0.7, 0.7, 0.7, 1),
            )
            tab_button.category = category
            tab_button.bind(on_release=self.on_tab_button_click)
            self.tabs_grid.add_widget(tab_button)

            logger.debug(f"Created tab: {category}")
        self.activate_first_tab()

    def activate_first_tab(self):
        first_tab = self.tabs_grid.children[-2]
        logger.info(f"{first_tab.category}")
        self.on_tab_button_click(first_tab)

    def on_tab_button_click(self, instance):
        if hasattr(self, "current_category"):
            prev_tab = next(
                (
                    tab
                    for tab in self.tabs_grid.children
                    if hasattr(tab, "category")
                    and tab.category == self.current_category
                ),
                None,
            )
            if prev_tab:
                prev_tab.background_color = (0.7, 0.7, 0.7, 1)

        logger.debug(f"Activated {instance.category}")
        self.current_category = instance.category
        instance.background_color = (0.5, 0, 0.5, 1)
        instance.color = (1, 1, 1, 1)

        records = self.updated_data.get(instance.category, [])
        self.textinput.text = "\n".join(record for record in records)

    def on_textinput_change(self, instance, values):
        if (
            hasattr(self, "current_category")
            and self.current_category in self.updated_data
        ):
            self.updated_data[self.current_category] = [
                value for value in values.split("\n") if value
            ]

    def update_entries(self, instance):
        self.data_manager.update_entries(
            self.updated_data,
            self.year_spinner.text,
            self.month_spinner.text,
            self.day_spinner.text,
        )


if __name__ == "__main__":
    PhiloStoneApp().run()
