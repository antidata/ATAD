java -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=127.0.0.1:5005 -XX:+CMSClassUnloadingEnabled -Xmx16000M -Xms16000M -jar `dirname $0`/sbt-launch.jar "$@"
