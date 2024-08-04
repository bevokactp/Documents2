
import logging


def validate_input_max_length(self, instance, value, max_length):
    if len(value) > max_length:
        instance.text = value[:max_length]
        logging.warning(f'Invalid input: {value} > {max_length} length')


def validate_input_hours_minutes(self, instance, value, min_value, max_value):

    try:
        # Check for invalid characters
        if '-' in value:
            logging.warning(f'Invalid input: {value} (contains "-")')
            instance.text = self.previous_value  # Revert to previous valid input
            return

        # Preserve previous value if the new input starts with zero or is empty
        if value.startswith('0') and len(value) > 1:
            logging.info(f'Invalid input: {value} (starts with zero)')
            instance.text = self.previous_value  # Revert to previous valid input
            return

        # Handle empty value (no change in input)
        if value == '':
            logging.info('Empty input allowed')
            instance.text = self.previous_value  # Revert to previous valid input
            return

        # Limit length to 2 digits
        if len(value) > 2:
            logging.info('Len > 2')
            value = value[:2]  # Keep only the first two characters

        # Check if the value is a positive integer within the range
        if value.isdigit() and min_value <= int(value) <= max_value:
            self.previous_value = value  # Update previous valid value
            instance.text = self.previous_value  # Update input field with two-length value
            logging.info(f'Valid input: {value}')
        else:
            logging.warning(f'Invalid input: {value}')
            instance.text = self.previous_value  # Revert to previous valid input
    except ValueError:
        logging.error(f'ValueError: Invalid input: {value}')
        instance.text = self.previous_value  # Revert to previous valid input
