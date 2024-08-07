import logging

# Define color codes
RESET = "\033[0m"
RED = "\033[31m"
GREEN = "\033[32m"
YELLOW = "\033[33m"
BLUE = "\033[34m"
MAGENTA = "\033[35m"
CYAN = "\033[36m"

# Map log levels to colors
LEVEL_COLORS = {
    logging.DEBUG: BLUE,
    logging.INFO: GREEN,
    logging.WARNING: YELLOW,
    logging.ERROR: RED,
    logging.CRITICAL: MAGENTA,
}


class ColoredFormatter(logging.Formatter):
    def format(self, record):
        level_color = LEVEL_COLORS.get(record.levelno, RESET)
        level_name = record.levelname
        func_name = record.funcName
        filename = record.filename
        # Include the module (class) name if available
        class_name = record.name if hasattr(record, "name") else "N/A"
        # Format the log message with color for level name and function name
        log_msg = super().format(record)
        return (
            f"{level_color}[ {level_name:<7} ]{RESET} "
            f"{filename:<15} "
            f"{class_name:<15} "
            f"{level_color}[ {func_name:<20} ]{RESET} "
            f"{log_msg}"
        )


def configure_logger(name, level):
    # Configure the logger
    logger = logging.getLogger(name)
    logger.setLevel(level)

    # Create console handler
    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)

    # Create formatter and set it for the handler
    formatter = ColoredFormatter("%(message)s")
    console_handler.setFormatter(formatter)

    # Add handler to the logger
    logger.addHandler(console_handler)

    return logger
