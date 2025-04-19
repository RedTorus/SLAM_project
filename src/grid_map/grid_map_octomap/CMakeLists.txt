cmake_minimum_required(VERSION 3.12)
project(grid_map_octomap)

# Set the policy for the new IN_LIST operator.
cmake_policy(SET CMP0057 NEW)

## Find required packages.
find_package(ament_cmake REQUIRED)
find_package(grid_map_cmake_helpers REQUIRED)
find_package(grid_map_core REQUIRED)
find_package(OCTOMAP REQUIRED)
find_package(Eigen3 REQUIRED)

message(STATUS "Found Octomap (version ${octomap_VERSION}): ${OCTOMAP_INCLUDE_DIRS}")
message(STATUS "Found Eigen3: ${EIGEN3_INCLUDE_DIRS}")

## Include local directories and Eigen3.
include_directories(
  include
  ${EIGEN3_INCLUDE_DIRS}
)

## Declare the grid_map_octomap library.
add_library(${PROJECT_NAME}
  src/GridMapOctomapConverter.cpp
)

## Use ament_target_dependencies for compile definitions (this call uses a plain signature).
ament_target_dependencies(${PROJECT_NAME}
  grid_map_core
  grid_map_cmake_helpers
  OCTOMAP
  Eigen3
)

## Link grid_map_core.
if(TARGET grid_map_core::grid_map_core)
  message(STATUS "Linking with grid_map_core target: grid_map_core::grid_map_core")
  target_link_libraries(${PROJECT_NAME} PUBLIC grid_map_core::grid_map_core ${OCTOMAP_LIBRARIES})
elseif(DEFINED grid_map_core_LIBRARIES)
  message(STATUS "Using grid_map_core_LIBRARIES variable: ${grid_map_core_LIBRARIES}")
  target_link_libraries(${PROJECT_NAME} PUBLIC ${grid_map_core_LIBRARIES} ${OCTOMAP_LIBRARIES})
else()
  message(WARNING "grid_map_core target not found; attempting manual library path resolution.")
  # Set manual library path; adjust the relative path as needed.
  set(GRID_MAP_CORE_LIB "${CMAKE_CURRENT_SOURCE_DIR}/../../grid_map_core/lib/libgrid_map_core.so")
  if(EXISTS ${GRID_MAP_CORE_LIB})
    message(STATUS "Found grid_map_core library at ${GRID_MAP_CORE_LIB}")
    target_link_libraries(${PROJECT_NAME} PUBLIC ${GRID_MAP_CORE_LIB} ${OCTOMAP_LIBRARIES})
  else()
    message(FATAL_ERROR "grid_map_core library not found. Please ensure grid_map_core is built and installed correctly "
                        "(try sourcing your overlay: source ~/Downloads/tiago_ws/install/setup.bash, or remove the underlay version).")
  endif()
endif()

## Optionally add grid_map_core's include directories.
if(NOT grid_map_core_INCLUDE_DIRS)
  message(WARNING "grid_map_core_INCLUDE_DIRS is empty; attempting to retrieve from grid_map_core target properties.")
  if(TARGET grid_map_core::grid_map_core)
    get_target_property(GMC_INC grid_map_core::grid_map_core INTERFACE_INCLUDE_DIRECTORIES)
    if(GMC_INC)
      set(grid_map_core_INCLUDE_DIRS ${GMC_INC})
      message(STATUS "grid_map_core include directories (from target): ${grid_map_core_INCLUDE_DIRS}")
    else()
      message(WARNING "Unable to retrieve grid_map_core include directories from grid_map_core::grid_map_core.")
    endif()
  else()
    message(WARNING "grid_map_core::grid_map_core target does not exist; skipping include directory propagation.")
  endif()
endif()
if(grid_map_core_INCLUDE_DIRS)
  target_include_directories(${PROJECT_NAME} PUBLIC ${grid_map_core_INCLUDE_DIRS})
endif()

#############
## Install ##
#############

install(
  TARGETS ${PROJECT_NAME}
  ARCHIVE DESTINATION lib
  LIBRARY DESTINATION lib
  RUNTIME DESTINATION lib/${PROJECT_NAME}
)
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
    target_link_libraries(${PROJECT_NAME}_test ${PROJECT_NAME})
    if(TARGET grid_map_core::grid_map_core)
      target_link_libraries(${PROJECT_NAME}_test PUBLIC grid_map_core::grid_map_core)
    elseif(DEFINED grid_map_core_LIBRARIES)
      target_link_libraries(${PROJECT_NAME}_test PUBLIC ${grid_map_core_LIBRARIES})
    endif()
  endif()
endif()

ament_export_dependencies(OCTOMAP)
ament_export_include_directories(
  include
  ${OCTOMAP_INCLUDE_DIRS}
  ${EIGEN3_INCLUDE_DIRS}
)
ament_export_libraries(${PROJECT_NAME})
ament_package()

