from datetime import datetime


class Reminder:
    def __init__(self, name, start_time, interval, activated, id_reminder=None):
        self.id_reminder = id_reminder
        self.name = name
        self.start_time = datetime.strptime(start_time, '%H:%M') if isinstance(start_time, str) else start_time
        self.interval = datetime.strptime(interval, '%H:%M') if isinstance(interval, str) else interval
        self.activated = activated

    def to_dict(self):
        return {
            'name': self.name,
            'start_time': self.start_time.strftime('%H:%M'),
            'interval': self.interval.strftime('%H:%M'),
            'activated': self.activated
        }
