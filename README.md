# Docker Environment Setup for ROS SLAM

This document provides detailed instructions to set up and run a Docker-based environment configured for ROS simulations using Gazebo, TurtleBot3, and RTAB-Map SLAM.

---

## 1. Docker Image Setup

Pull the pre-configured Docker image:
```bash
docker pull redtorus/slam-dev-custom:latest
```
---

## 2. Running the Docker Container with Graphics Support

Enable Docker to access the local X server:
```bash
xhost +local:docker
```
Run the container with GPU and graphics support:
```bash
docker run -it --rm --net=host \
    --gpus all --device /dev/dri \
    -e DISPLAY=$DISPLAY \
    -e QT_X11_NO_MITSHM=1 \
    -e NVIDIA_VISIBLE_DEVICES=all \
    -e NVIDIA_DRIVER_CAPABILITIES=all \
    -v /tmp/.X11-unix:/tmp/.X11-unix:rw \
    redtorus/slam-dev-custom:latest bash
```
---

## 3. Launching Gazebo Simulations

Launch Gazebo simulations with TurtleBot3 using predefined worlds:

- Pal Office World:
```bash
roslaunch turtlebot3_gazebo turtlebot3_pal_office.launch
```
- House World:
```bash
roslaunch turtlebot3_gazebo turtlebot3_house.launch
```
---

## 4. Keyboard Teleoperation

To manually control TurtleBot3 using keyboard inputs:
```bash
rosrun teleop_twist_keyboard teleop_twist_keyboard.py
```
---

## 5. Running RTAB-Map SLAM

To launch RTAB-Map with customized parameters optimized for your setup:
```bash
roslaunch rtabmap_launch rtabmap.launch \
    rtabmap_viz:=true \
    database_path:=/root/.ros/rtabmap.db \
    rtabmap_args="--Kp/DetectorStrategy 2 \
                  --Kp/DescriptorStrategy 2 \
                  --Optimizer/Strategy 5 \
                  --RGBD/LinearUpdate 0.05 \
                  --RGBD/AngularUpdate 0.05 \
                  --RGBD/DetectionRate 2 \
                  --Mem/STMSize 150 \
                  --Optimizer/MaxGraphDepth=300" \
    rgb_topic:=/camera/rgb/image_raw \
    depth_topic:=/camera/depth/image_raw \
    camera_info_topic:=/camera/rgb/camera_info \
    odom_topic:=/odom \
    use_sim_time:=true \
    approx_sync:=true \
    visual_odometry:=false
```
<<<<<<< HEAD
### Running Parallelized Ceres Solver

The RTAB-Map SLAM system supports a parallelized version of the Ceres Solver for optimization. This mode is particularly useful for large-scale problems where performance is critical. By leveraging multi-threading, it can optimize large pose graphs in real-time, making it ideal for applications requiring high computational efficiency.

#### Pose Graph Optimizer Overview

Here is the overview of the optimizer modes with their numeric values, use cases, and descriptions for RTAB-Map SLAM:

1. **Type `0`**
    - **Description**: TORO (Tree-based network Optimizer) backend.
    - **Use Case**: Lightweight, tree-based pose graph optimization. Best for smaller or simpler SLAM problems where computational efficiency is prioritized over advanced features.

2. **Type `1`**
    - **Description**: G2O (General Graph Optimization) backend.
    - **Use Case**: General-purpose graph optimization for both 2D and 3D SLAM. Ideal for scenarios requiring robust optimization with support for various solvers and robust kernels.

3. **Type `2`**
    - **Description**: GTSAM (Georgia Tech Smoothing and Mapping) backend.
    - **Use Case**: Incremental optimization for large-scale SLAM. Useful for real-time applications where efficiency and scalability are critical, such as mapping large environments.

4. **Type `3`**
    - **Description**: Ceres Solver backend.
    - **Use Case**: Nonlinear optimization for tasks like bundle adjustment. Suitable for scenarios requiring high precision, such as optimizing camera poses and landmarks in visual SLAM.

5. **Type `4`**
    - **Description**: CVSBA (Computer Vision Sparse Bundle Adjustment) backend.
    - **Use Case**: Sparse bundle adjustment for computer vision tasks. Best for optimizing camera parameters and 3D points in visual SLAM pipelines.

6. **Type `5`**
    - **Description**: Parallelized version of the Ceres Solver using OpenMP.
    - **Use Case**: Parallelized optimization for large-scale problems. Ideal for multi-threaded environments where performance is critical, such as optimizing large pose graphs in real-time SLAM.

###### Notes:
- **Type `5`** is newly added to the optimizer modes and is specifically designed for high-performance applications.
=======
---

## Notes
>>>>>>> c94b8235b1a9886885562edf13e37bd8a600d12d

- Ensure your system has proper GPU drivers installed to support graphics acceleration within Docker.
- Verify that your local X server allows Docker connections (`xhost +local:docker`) to prevent display issues.
- All commands provided assume you have ROS and Docker properly installed and configured on your host system.
<<<<<<< HEAD

=======
>>>>>>> c94b8235b1a9886885562edf13e37bd8a600d12d
