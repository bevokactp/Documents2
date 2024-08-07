import os
import logging
from datetime import datetime

from logger import configure_logger

logger = configure_logger(__name__, logging.INFO)


class DataManager:
    def __init__(self, data_dir, template_file):
        self.data_dir = data_dir
        self.template_file = template_file
        self.all_tsv_files = self.get_all_tsv_files()

    def get_file_path(self, year, month, day):
        date_str = f"{year}/{month.zfill(2)}/{day.zfill(2)}"
        file_path = os.path.join(self.data_dir, date_str + '.tsv')
        logger.info(f"File path resolved to: {file_path}")
        return file_path

    def file_exists(self, year, month, day):
        exists = os.path.exists(self.get_file_path(year, month, day))
        logger.info(f"File exists: {exists}")
        return exists

    def load_data(self, year, month, day):
        file_path = self.get_file_path(year, month, day)
        if not self.file_exists(year, month, day):
            logger.info("File does not exist. Creating file from template.")
            self.create_file_from_template(year, month, day)
        logger.info(f"Loading data from: {file_path}")
        with open(file_path, 'r', encoding='utf-8') as f:
            return self.parse_text(f)

    def create_file_from_template(self, year, month, day):
        template_data = self.load_template()
        file_path = self.get_file_path(year, month, day)
        logger.info(f"Creating file from template: {file_path}")

        with open(file_path, 'w', encoding='utf-8') as f:
            for line in template_data.splitlines():
                stripped_line = line.strip()
                if not stripped_line:
                    continue  # Skip empty lines
                if len(line) == len(line.lstrip()):
                    f.write(line + '\n')  # Write the line as is
                else:
                    f.write('\t' + stripped_line + '\n')  # Write the line with a tab prefix

    def load_template(self):
        logger.info(f"Loading template from: {self.template_file}")
        with open(self.template_file, 'r', encoding='utf-8') as f:
            return f.read()

    def parse_text(self, file_obj):
        categories = {}
        current_category = None

        for line in file_obj:
            row = line.lstrip()
            if len(row) == len(line):
                row = row.strip()
                if row:
                    current_category = row
                    categories[current_category] = []
            else:
                row = row.strip()
                if current_category:
                    categories[current_category].append(row)

        logger.debug(f"Parsed data: {categories}")
        return categories

    def get_all_tsv_files(self):
        files = []
        for layout, _, filenames in os.walk(self.data_dir):
            for filename in filenames:
                if filename.endswith(".tsv"):
                    files.append(os.path.join(layout, filename))
        return files

    def get_date_first_file_in_philo_stone(self):
        date_min = None
        for file in self.all_tsv_files:
            try:
                parts = file.split(os.sep)
                year, month, day = parts[-3], parts[-2], parts[-1].replace(".tsv", "")
                file_date = datetime(int(year), int(month), int(day))
                if date_min is None or file_date < date_min:
                    date_min = file_date
            except ValueError:
                continue
        return date_min if date_min else datetime.now()

    def update_entries(self, updated_data, year, month, day):
        file_path = self.get_file_path(year, month, day)
        logger.info(f"Saving updates to: {file_path}")

        with open(file_path, 'w', encoding='utf-8') as f:
            for category, records in updated_data.items():
                f.write(f"{category}\n")
                for record in records:
                    row = f"\t{record}\n"
                    f.write(row)

        logger.info("updated successfully {file_path}")
