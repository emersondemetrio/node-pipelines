#!/bin/bash

N=$1
if [ $# -ne 1 ]; then
    N=1000000
fi

line="This is a line in a large file."
printf "Creating a file with %d lines\n" $N
rm -f data/large-file.txt
for ((i = 1; i <= N; i++)); do
    echo "$line $i" >>data/large-file.txt

    percentage=$((100 * i / N))
    printf "\rLine %d of %d (%d%%)" $i $N $percentage
done

LC=$(cat data/large-file.txt | wc -l)
echo
echo "Lines created: $LC"
