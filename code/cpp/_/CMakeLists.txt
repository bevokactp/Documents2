
cmake_minimum_required(VERSION 3.10)
project(MuDa8)

set(CMAKE_CXX_STANDARD 17)  # Set C++17 standard

enable_testing()

# Add source files
add_executable(MuDa8 src/main.cpp src/functions.cpp)

# Add the GoogleTest framework
include(FetchContent)
FetchContent_Declare(
  googletest
  URL https://github.com/google/googletest/archive/refs/tags/release-1.11.0.zip
)
FetchContent_MakeAvailable(googletest)

# Link the GoogleTest library to your tests
add_executable(main_test tests/main.test.cpp)
target_link_libraries(main_test gtest_main)

add_executable(function_test tests/functions.test.cpp src/functions.cpp)
target_link_libraries(function_test gtest_main)

include(GoogleTest)
gtest_discover_tests(main_test)
gtest_discover_tests(function_test)
