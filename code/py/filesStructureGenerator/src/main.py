import os
import re
import subprocess

def create_structure(path, structure):
    # Создаем корневую папку, если не существует
    if not os.path.exists(path):
        os.makedirs(path)

    # Перебираем строки структуры
    lines = structure.strip().split('\n')
    for line in lines:
        # Определяем уровень вложенности и тип объекта (файл/папка)
        indent_level = len(re.match(r'^\s*', line).group())
        name = line.strip()
        if name.endswith('/'):
            # Если это папка
            name = name[:-1]  # Убираем слеш в конце
            subdir_path = os.path.join(path, name)
            # Создаем папку
            if not os.path.exists(subdir_path):
                os.makedirs(subdir_path)
        else:
            # Если это файл
            file_path = os.path.join(path, name)
            # Создаем пустой файл
            if not os.path.exists(file_path):
                with open(file_path, 'w') as f:
                    pass

        # Обрабатываем вложенные папки и файлы
        if indent_level > 0:
            parent_dir = os.path.join(path, lines[indent_level - 1].strip().rstrip('/'))
            create_structure(parent_dir, '\n'.join(lines[indent_level:]))

def resolve_directory_name(base_path, dir_name):
    # Проверяем существует ли директория с таким именем
    new_dir_name = dir_name
    counter = 1
    while os.path.exists(os.path.join(base_path, new_dir_name)):
        new_dir_name = f"{dir_name}_{counter}"
        counter += 1
    return new_dir_name

def create_file_structure_from_tree(file_path, root_path='./_trees'):
    with open(file_path, 'r') as file:
        structure = file.read()

    # Проверяем и создаем корневую директорию
    if not os.path.exists(root_path):
        os.makedirs(root_path)

    lines = structure.strip().split('\n')
    root_name = lines[0].split('/')[0]
    root_path = os.path.join(root_path, resolve_directory_name(root_path, root_name))

    # Создаем файловую структуру
    create_structure(root_path, '\n'.join(lines))

    # Вызываем команду `tree` для отображения структуры
    subprocess.run(['tree', root_path])

# Пример использования
create_file_structure_from_tree('tree.txt')
import os

def parse_tree_file(filename):
    """Парсит файл с описанием структуры и возвращает дерево файлов и папок."""
    with open(filename, 'r') as file:
        lines = file.readlines()

    tree = {}
    stack = []

    for line in lines:
        stripped_line = line.strip()
        if not stripped_line:
            continue

        depth = line.count('│') + line.count('├──') + line.count('└──')
        entry = stripped_line.replace('├──', '').replace('└──', '').replace('│', '').strip()

        while len(stack) > depth:
            stack.pop()

        if depth == 0:
            tree[entry] = {}
            stack.append((entry, tree))
        else:
            parent_name, parent_dict = stack[-1]
            if entry.endswith('/'):
                entry = entry[:-1]
                parent_dict[entry] = {}
                stack.append((entry, parent_dict[entry]))
            else:
                parent_dict[entry] = None

    return tree

def create_files_and_folders(base_path, tree):
    """Создает файлы и папки по структуре дерева."""
    for name, sub_tree in tree.items():
        path = os.path.join(base_path, name)

        if sub_tree is None:  # Это файл
            with open(path, 'w') as f:
                pass
        else:  # Это папка
            if os.path.exists(path):
                # Если папка уже существует, добавляем к имени _{число}
                i = 1
                new_path = path
                while os.path.exists(new_path):
                    new_path = f"{path}_{i}"
                    i += 1
                path = new_path

            os.makedirs(path, exist_ok=True)
            create_files_and_folders(path, sub_tree)

def main():
    # Задаем путь к файлу с описанием и папке для создания структуры
    input_file = 'tree.txt'
    output_dir = './_trees'

    # Создаем выходную директорию, если ее нет
    os.makedirs(output_dir, exist_ok=True)

    # Парсим файл
    tree = parse_tree_file(input_file)

    # Создаем структуру
    create_files_and_folders(output_dir, tree)

    # Выводим структуру
    os.system(f'tree {output_dir}')

if __name__ == '__main__':
    main()
