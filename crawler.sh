#!/bin/bash
root="/media/taylor/Data/Linux/Github/crawler"
root="."
cd $root
data="$root/data"
date=`date +"%Y-%m-%d"`

N=1

# Increment $N as long as a directory with that name exists
if [ -d "$data/$date" ]; then
	while [[ -d "$data/$date" ]] ; do
		N=$(($N+1))
		date=`date +"%Y-%m-%d"`_$N
	done
fi

path=$data/$date
site="https://proraftingtours.com"
mkdir $path
# wget -m $site -P $path -r
# httrack  $site -O $path  -%v

rm -r $data/current
mkdir $data/current
cp $path/* -r $data/current
cd $root

git add .
git commit -m "Update $date"
git push

cd $path
# Submit main page
# curl -v "https://web.archive.org/save/$site"
# find . -name "*.html" -exec curl -v "https://web.archive.org/save/https://{}" ';'

