percentage=$((100 * i / N))
printf "\rLine %d of %d (%d%%)" $i $N $percentage

# tail -f data/large-file.txt
