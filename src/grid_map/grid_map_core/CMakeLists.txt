cmake_minimum_required(VERSION 3.5)
project(grid_map_core)

## Find ament_cmake macros and libraries
find_package(ament_cmake REQUIRED)
find_package(grid_map_cmake_helpers REQUIRED)

## Define Eigen addons.
include(cmake/${PROJECT_NAME}-extras.cmake)

## System dependencies are found with CMake's conventions
find_package(Eigen3 REQUIRED)

grid_map_package()

###########
## Build ##
###########

## Declare a C++ library
add_library(${PROJECT_NAME}
  src/GridMap.cpp
  src/GridMapMath.cpp
  src/SubmapGeometry.cpp
  src/BufferRegion.cpp
  src/Polygon.cpp
  src/CubicInterpolation.cpp
  src/iterators/GridMapIterator.cpp
  src/iterators/SubmapIterator.cpp
  src/iterators/CircleIterator.cpp
  src/iterators/EllipseIterator.cpp
  src/iterators/SpiralIterator.cpp
  src/iterators/PolygonIterator.cpp
  src/iterators/LineIterator.cpp
  src/iterators/SlidingWindowIterator.cpp
)

## Specify include directories
target_include_directories(${PROJECT_NAME}
  PUBLIC
    "$<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>"
    "$<INSTALL_INTERFACE:include>"       # Changed from include/${PROJECT_NAME} to include
)

target_link_libraries(${PROJECT_NAME} PUBLIC Eigen3::Eigen)

#############
## Install ##
#############

# Install the library.
install(
  TARGETS ${PROJECT_NAME}
  EXPORT export_${PROJECT_NAME}
  LIBRARY DESTINATION lib
  ARCHIVE DESTINATION lib
  RUNTIME DESTINATION lib/${PROJECT_NAME}
)

# Install header files from the include folder.
# This copies the entire "include/" directory as-is (preserving the structure),
# so if your repository structure is:
#   include/grid_map_core/...
# then after installation the headers will be at:
#   <install>/include/grid_map_core/...
install(
  DIRECTORY include/
  DESTINATION include
  FILES_MATCHING PATTERN "*.hpp"
)

# Install documentation.
install(
  DIRECTORY doc
  DESTINATION share/${PROJECT_NAME}
)

#############
## Config Files ##
#############

# Configure the package config files using templates.
configure_file("${CMAKE_CURRENT_SOURCE_DIR}/cmake/GridMapCoreConfig.cmake.in"
  "${CMAKE_CURRENT_BINARY_DIR}/grid_map_coreConfig.cmake"
  @ONLY
)
configure_file("${CMAKE_CURRENT_SOURCE_DIR}/cmake/GridMapCoreConfigVersion.cmake.in"
  "${CMAKE_CURRENT_BINARY_DIR}/grid_map_coreConfigVersion.cmake"
  @ONLY
)

# Install the generated configuration files.
install(
  FILES
    "${CMAKE_CURRENT_BINARY_DIR}/grid_map_coreConfig.cmake"
    "${CMAKE_CURRENT_BINARY_DIR}/grid_map_coreConfigVersion.cmake"
  DESTINATION lib/cmake/${PROJECT_NAME}
)

# Export targets and install the targets file.
install(
  EXPORT export_${PROJECT_NAME}
  FILE ${PROJECT_NAME}Targets.cmake
  NAMESPACE ${PROJECT_NAME}::
  DESTINATION lib/cmake/${PROJECT_NAME}
)

#############
## Testing ##
#############

if(BUILD_TESTING)
  find_package(ament_lint_auto REQUIRED)
  find_package(ament_lint_auto QUIET)
  if(ament_lint_auto_FOUND)
    list(APPEND AMENT_LINT_AUTO_EXCLUDE
      ament_cmake_cpplint
      ament_cmake_copyright
    )
    ament_lint_auto_find_test_dependencies()
    find_package(ament_cmake_cpplint)
    ament_cpplint(
      FILTERS -legal/copyright -build/include_order
    )
  endif()
  ament_lint_auto_find_test_dependencies()

  find_package(ament_cmake_gtest REQUIRED)

  ament_add_gtest(${PROJECT_NAME}-test
    test/test_grid_map_core.cpp
    test/test_helpers.cpp
    test/CubicConvolutionInterpolationTest.cpp
    test/CubicInterpolationTest.cpp
    test/GridMapMathTest.cpp
    test/GridMapTest.cpp
    test/GridMapIteratorTest.cpp
    test/LineIteratorTest.cpp
    test/EllipseIteratorTest.cpp
    test/SubmapIteratorTest.cpp
    test/PolygonIteratorTest.cpp
    test/PolygonTest.cpp
    test/EigenPluginsTest.cpp
    test/SpiralIteratorTest.cpp
    test/SlidingWindowIteratorTest.cpp
  )
  if(TARGET ${PROJECT_NAME}-test)
    target_link_libraries(${PROJECT_NAME}-test ${PROJECT_NAME})
  endif()
endif()

ament_export_targets(export_${PROJECT_NAME} HAS_LIBRARY_TARGET)
ament_export_dependencies(Eigen3)
ament_package(CONFIG_EXTRAS cmake/${PROJECT_NAME}-extras.cmake)

