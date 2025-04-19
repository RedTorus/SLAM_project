roslaunch rtabmap_launch rtabmap.launch rtabmap_viz:=false database_path:=/tmp/.ros/rtabmap.db rtabmap_args:="--delete_db_on_start"
apt-get update
apt-get install -y curl gnupg2 lsb-release
apt-get update
apt-get install -y ros-noetic-desktop-full
rosdep init
rosdep update
echo "source /opt/ros/noetic/setup.bash" >> ~/.bashrc
source ~/.bashrc
mkdir -p ~/catkin_ws/src
cd ~/catkin_ws
rostopic list
roscore
