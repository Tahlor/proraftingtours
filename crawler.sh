#!/bin/bash
root="/media/taylor/Data/Linux/Github/crawler"
root="."
cd $root
data="$root/data"
date=`date +"%Y-%m-%d"`


depth=${1:-5}
echo "Using depth of $depth"

N=1

# Increment $N as long as a directory with that name exists
if [ -d "$data/$date" ]; then
	while [[ -d "$data/$date" ]] ; do
		N=$(($N+1))
		date=`date +"%Y-%m-%d"`_$N
	done
fi

#path=$data/$date
path=$data/current
current=$data/current

site="https://proraftingtours.com"
mkdir $path
# wget -m $site -P $path -r

if [[ ! $path -ef $current ]]; then
	# Create a new mirror from scratch
	httrack  $site -O $path  -%v --depth=$depth
	rm -r $data/current
	mkdir $data/current
	cp $path/* -r $data/current
else
	# Update exisiting mirror
	httrack  $site -O $path  -%v --update --depth=$depth
fi

cd $root

rm $GITHUB/proraftingtours/.git/index.lock
echo $date > last_update
git add .
git commit -m "Update $date"
git push

cd $path


# Submit to webarchive
# Submit main page
# curl -v "https://web.archive.org/save/$site"
# find . -name "*.html" -exec curl -v "https://web.archive.org/save/https://{}" ';'

