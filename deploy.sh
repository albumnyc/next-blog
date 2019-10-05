tar -zcvf ./next_blog.tar.gz --exclude ./node_modules .
scp -r ../next_blog.tar.gz root@106.52.39.64:~/wordspace
ssh root@106.52.39.64 "cd ~/wordspace ; tar -zxvf next_blog.tar.gz; npm run build"

# chmod a+x ./deploy.sh