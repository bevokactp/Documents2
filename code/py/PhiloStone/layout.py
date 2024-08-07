from datetime import datetime

from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.spinner import Spinner
from kivy.uix.textinput import TextInput
from kivy.uix.scrollview import ScrollView
from kivy.uix.gridlayout import GridLayout
from kivy.uix.boxlayout import BoxLayout


def draw_layout(self):
    self.layout = BoxLayout(orientation="vertical")

    self.layout.add_widget(draw_top(self))
    self.layout.add_widget(draw_middle(self))
    self.layout.add_widget(draw_bottom(self))


def draw_top(self):
    top_row = BoxLayout(size_hint_y=0.1, padding=10)
    self.year_spinner = Spinner(
        text=str(datetime.now().year),
        values=[str(year) for year in range(2000, datetime.now().year + 1)],
        size_hint=(0.3, 1),
    )
    self.month_spinner = Spinner(
        text=str(datetime.now().month),
        values=[str(month) for month in range(1, 13)],
        size_hint=(0.3, 1),
    )
    self.day_spinner = Spinner(
        text=str(datetime.now().day),
        values=[str(day) for day in range(1, 32)],
        size_hint=(0.3, 1),
    )
    self.load_button = Button(
        text="Read", size_hint=(0.1, 1), on_release=self.load_data
    )

    top_row.add_widget(self.year_spinner)
    top_row.add_widget(self.month_spinner)
    top_row.add_widget(self.day_spinner)
    top_row.add_widget(self.load_button)

    return top_row


def draw_middle(self):
    content_layout = BoxLayout(orientation="horizontal", size_hint_y=0.8)

    self.tabs_container = ScrollView(size_hint=(0.2, 1))
    self.tabs_grid = GridLayout(cols=1, size_hint_y=None)
    self.tabs_container.add_widget(self.tabs_grid)

    self.content_container = BoxLayout(orientation="vertical", size_hint=(0.8, 1))
    self.textinput = TextInput(size_hint=(1, 1), multiline=True, readonly=False)
    self.textinput.bind(text=self.on_textinput_change)
    self.content_container.add_widget(self.textinput)

    content_layout.add_widget(self.tabs_container)
    content_layout.add_widget(self.content_container)

    return content_layout


def draw_bottom(self):
    bottom_row = BoxLayout(orientation="horizontal", size_hint_y=0.05)
    self.file_count_label = Label(size_hint_y=0.8, text="")
    self.days_difference_label = Label(size_hint_y=0.8, text="")
    bottom_row.add_widget(self.file_count_label)
    bottom_row.add_widget(self.days_difference_label)

    return bottom_row
