#!/usr/bin/env python3

import os
from os.path import join
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument, IncludeLaunchDescription, SetEnvironmentVariable, AppendEnvironmentVariable
from launch.substitutions import LaunchConfiguration
from launch.launch_description_sources import PythonLaunchDescriptionSource
from ament_index_python.packages import get_package_share_directory

def generate_launch_description():
    bcr_bot_path = get_package_share_directory('bcr_bot')
    tiago_pkg = get_package_share_directory('tiago_description')

    world_file = LaunchConfiguration("world_file", default=join(bcr_bot_path, 'worlds', 'small_warehouse.sdf'))
    use_sim_time = LaunchConfiguration('use_sim_time', default='true')

    gazebo_launch = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(join(get_package_share_directory("gazebo_ros"), "launch", "gazebo.launch.py"))
    )

    spawn_tiago_node = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(join(tiago_pkg, 'launch', 'tiago_spawn.launch.py'))
    )

    return LaunchDescription([
        AppendEnvironmentVariable(name='GAZEBO_MODEL_PATH', value=join(bcr_bot_path, "models")),
        SetEnvironmentVariable(name='GAZEBO_RESOURCE_PATH', value="/usr/share/gazebo-11:" + join(bcr_bot_path, "worlds")),

        DeclareLaunchArgument('world', default_value=world_file),
        DeclareLaunchArgument('gui', default_value='true'),
        DeclareLaunchArgument('verbose', default_value='false'),
        DeclareLaunchArgument('use_sim_time', default_value=use_sim_time),

        gazebo_launch,
        spawn_tiago_node
    ])
