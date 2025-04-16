cmake_minimum_required(VERSION 3.5)
project(grid_map_octomap)

## Find required packages.
find_package(ament_cmake REQUIRED)
find_package(grid_map_cmake_helpers REQUIRED)
find_package(grid_map_core REQUIRED)      # Ensures your overlay grid_map_core is used.
find_package(OCTOMAP REQUIRED)

message(STATUS "Found Octomap (version ${octomap_VERSION}): ${OCTOMAP_INCLUDE_DIRS}")

###########
## Build ##
###########

# Include local include directory.
include_directories(include)

# Define dependencies (exclude grid_map_core so we add it separately).
set(dependencies OCTOMAP)

## Declare the grid_map_octomap library.
add_library(${PROJECT_NAME}
  src/GridMapOctomapConverter.cpp
)

# Process OCTOMAP dependency with ament_target_dependencies.
ament_target_dependencies(${PROJECT_NAME} SYSTEM ${dependencies})

# Explicitly link grid_map_core (using plain signature so all target_link_libraries calls are consistent).
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
  ament_add_gtest(${PROJECT_NAME}-test
    test/test_grid_map_octomap.cpp
    test/OctomapConverterTest.cpp
  )
  if(TARGET ${PROJECT_NAME}-test)
    target_link_libraries(${PROJECT_NAME}-test
      ${PROJECT_NAME}
      ${OCTOMAP_LIBRARIES}
    )
  endif()
endif()

ament_export_dependencies(${dependencies})
ament_export_include_directories(include ${OCTOMAP_INCLUDE_DIRS})
ament_export_libraries(${PROJECT_NAME} ${OCTOMAP_LIBRARIES})
ament_package()
