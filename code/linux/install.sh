
sudo apt-get --configure -a
sudo apt-get update
sudo apt-get install okular
sudo apt-get install guake cmake tree inxi make
sudo apt-get install vlc 
sudo apt-get install megasync insync
sudo apt-get install bleachbit hwinfo hardinfo gparted
sudo apt-get install imagemagick gimp pinta cheese variety
sudo apt-get install pandoc
sudo rm /etc/apt/preferences.d/nosnap.pref
sudo apt-get install snapd 
sudo apt-get install unetbootin 
sudo apt-get install python3-tk python3-pip python3-dev python-setuptools build-essential
sudo apt-get install ffmpeg audacity

sudo apt-get update
sudo snap install losslesscut
sudo snap install telegram-desktop
sudo snap install czkawka
sudo snap install opera
sudo snap install freecad
sudo snap install blender --classic
sudo snap install node --classic
sudo snap install cura-slicer
sudo snap install code --classic

sudo sudo apt install git p7zip-full python3-pip python3-wxgtk4.0 grub2-common grub-pc-bin parted dosfstools ntfs-3g
sudo pip3 install WoeUSB-ng

flatpak install flathub com.bambulab.BambuStudio
flatpak install flathub cc.arduino.IDE2

flatpak run cc.arduino.IDE2
flatpak run com.bambulab.BambuStudio

sudo add-apt-repository ppa:audio-recorder/ppa
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt-get update
sudo apt-get install audio-recorder
sudo apt install -y boot-repair && boot-repair

sudo apt-get purge --auto-remove brltty
sudo usermod -a -G tty bk
sudo usermod -a -G dialout bk
