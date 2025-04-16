cmake_minimum_required(VERSION 3.5)
project(grid_map_octomap)

## Find required packages.
find_package(ament_cmake REQUIRED)
find_package(grid_map_cmake_helpers REQUIRED)
find_package(grid_map_core REQUIRED)   # Add this to force your overlay version.
find_package(OCTOMAP REQUIRED)

message(STATUS "Found Octomap (version ${octomap_VERSION}): ${OCTOMAP_INCLUDE_DIRS}")

## Include local include directories.
include_directories(include)

## Declare the grid_map_octomap library.
add_library(${PROJECT_NAME}
  src/GridMapOctomapConverter.cpp
)

## Set up dependencies using ament_target_dependencies for OCTOMAP only.
ament_target_dependencies(${PROJECT_NAME} SYSTEM OCTOMAP)

## Explicitly link grid_map_core so that its include directories get propagated.
target_link_libraries(${PROJECT_NAME} grid_map_core)

#############
## Install ##
#############

# Install the library.
install(
  TARGETS ${PROJECT_NAME}
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION lib/${PROJECT_NAME}
)

# Install header files.
install(
  DIRECTORY include/${PROJECT_NAME}/
  DESTINATION include/${PROJECT_NAME}
  FILES_MATCHING PATTERN "*.hpp"
)

#############
## Testing ##
#############

if(BUILD_TESTING)
  find_package(ament_cmake_gtest REQUIRED)
  ament_add_gtest(${PROJECT_NAME}_test
    test/test_grid_map_octomap.cpp
    test/OctomapConverterTest.cpp
  )
  if(TARGET ${PROJECT_NAME}_test)
    target_link_libraries(${PROJECT_NAME}_test ${PROJECT_NAME} ${OCTOMAP_LIBRARIES})
  endif()
endif()

ament_export_dependencies(OCTOMAP)
ament_export_include_directories(include ${OCTOMAP_INCLUDE_DIRS})
ament_export_libraries(${PROJECT_NAME} ${OCTOMAP_LIBRARIES})
ament_package()

