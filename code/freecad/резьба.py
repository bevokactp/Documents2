import FreeCAD as App
from FreeCAD import Base

# Создать новый документ
doc = App.newDocument()

# Создать цилиндр
cyl = doc.addObject("Part::Cylinder", "Cylinder")
cyl.Radius = 10
cyl.Height = 20

# Создать резьбу
thread = doc.addObject("Part::Thread", "Thread")
thread.ThreadType = "Metric"
thread.ThreadSize = "M10"
thread.Pitch = 1.5
thread.Depth = 10

# Добавить резьбу к цилиндру
cyl.addObject(thread)

# Выбрать цилиндр с резьбой
doc.recompute()
