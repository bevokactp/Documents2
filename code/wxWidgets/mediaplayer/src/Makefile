# Define the compiler and flags
CXX = g++
CXXFLAGS = -std=c++17 -Wall -g
LDFLAGS = $(shell wx-config --libs core,base,stc,html) -lvlc
INCLUDES = $(shell wx-config --cxxflags) -I/usr/include/vlc

# Define the source files and the executable
SRCS = main.cpp
OBJS = $(SRCS:.cpp=.o)
EXEC = media_player

# Default target
all: $(EXEC)

# Link the executable
$(EXEC): $(OBJS)
	$(CXX) $(CXXFLAGS) -o $@ $(OBJS) $(LDFLAGS)

# Compile source files into object files
%.o: %.cpp
	$(CXX) $(CXXFLAGS) $(INCLUDES) -c $< -o $@

debug: $(EXEC)
	gdb ./$(EXEC)

run:
	make clean && make && ./media_player

# Clean up
clean:
	rm -f $(OBJS) $(EXEC)

.PHONY: all clean
