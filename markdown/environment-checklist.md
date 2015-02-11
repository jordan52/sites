---
{
    "title": "Personal Environment Checklist",
    "shortTitle": "environment-checklist",
    "summary": "some notes",
    "created": "2015-02-07",
    "modified": "2015-02-07",
    "type":"general",
    "categories": [
        "tech"
    ],
    "tags": [
        "servers","operations","environment","code"
    ]
}
---
The reason for this is not to map out an environment for a legit company, but more a way to keep a small, 
budget diy setup organized and complete. I want to utilize my home network and figure out the most minimalist way to 
host services that won't just die out. I want a few things just so I have them:

postgres
elasticsearch
jenkins
automatic backups
a way to not worry about a failure
monitoring

Generally, i want to host a few things on a machine in a datacenter but be able to automatically fail over to my 
house if that server barfs.

service
  how it is monitored
  where it is backed up
  how to manage security credentials

email - get the fiftytwo.net email working via google apps

install virtualbox. make a big ubuntu 14.04 box and install:

salt:
https://www.digitalocean.com/community/tutorials/how-to-install-salt-on-ubuntu-12-04
https://www.digitalocean.com/community/tutorials/how-to-create-your-first-salt-formula
http://docs.saltstack.com/en/latest/topics/tutorials/quickstart.html

how to add formulas - http://docs.saltstack.com/en/latest/topics/development/conventions/formulas.html

cd /srv/formulas
git clone https://github.com/saltstack-formulas/jenkins-formula.git
vi /etc/salt/master
service salt-master restart


what's done?
git, nginx, jenkins, es, logstash, kibana, nodejs, pm2, nagios(?), ipython.
jenkins can pull from github and my private git repo (i added jenkins and jordan public keys to the git user) jenkins
 can build and test a node project but to get angularNonsense to really test, read and implement this: http://karma-runner.github.io/0.12/plus/jenkins.html

the full salt config is in my personal git server.

now i need to install aws-cli, put keys on the server and write a cron job to automate backups to s3. things to back 
up:
 /home/git/repos (use this gist to figure out how to create the date and whatnot - https://gist.github
 .com/philippb/1988919 )
 /usr/lib/jenkins (install scm-sync-configuration and configure it to sync to my git repo)
 elsaticsearch - http://www.elasticsearch.org/guide/en/elasticsearch/guide/current/backing-up-your-cluster.html and 
 http://www.elasticsearch.org/guide/en/elasticsearch/reference/current/modules-snapshots.html and https://github.com/elasticsearch/elasticsearch-cloud-aws#s3-repository
 

wget -O - https://bootstrap.saltstack.com | sudo sh
vi /etc/salt/minion add file_client: local
vi /srv/salt/top.sls
base:
  '*':
    - git
    - nginx
    - jenkins
    - elasticsearch
    - logstash
    - kibana
    - nodejs
    - pm2
    - nagios
    - ipython
    - postgres
    
add a state tree for each state above:
vi /srv/salt/git.sls
git:               # ID declaration
  pkg:                # state declaration
    - installed       # function declaration
run salt:
salt-call --local state.highstate -l debug



git - host my own git server , gitolite?
  have nagios check the url to make sure it responds
  s3cmd sync the project directory and config directory every night.
  ssh access only

nginx - for everything
  nagios
  commit config to git
  log everything to logstash
  
jenkins (build/deploy/multi environment) requires a jdk to run. figure out the best place for JENKINS_HOME
  nagios 
  commit config to git, stored in JENKINS_HOME
  ssl via fiftytwo.net, password protected behind nginx
  
elasticsearch
  nagios
  commit {path.home}/config to git, s3cmd sync {path.home}/data and {path.home}/plugins
  ssl via fiftytwo.net, add basic-auth and authorization per this article - http://www.elasticsearch.org/blog/playing-http-tricks-nginx/
  
logstash - https://blog.devita.co/2014/09/04/monitoring-pfsense-firewall-logs-with-elk-logstash-kibana-elasticsearch/
  nagios
  commit config to git - https://www.digitalocean.com/community/tutorials/how-to-use-logstash-and-kibana-to-centralize-and-visualize-logs-on-ubuntu-14-04
  behind nginx basic auth
  
kibana 
  nagios
  commit config to git
  behind nginx basic auth
  
nagios
  ?
  commit config to git
  behind nginx
  
ipython notebook
  nagios
  commit my environment setup to git
  behind nginx basic auth
  
python codebase
  commit everything to my git

pm2 for running node apps
  nagios? log to logstash - https://blog.devita.co/2014/09/04/monitoring-pfsense-firewall-logs-with-elk-logstash-kibana-elasticsearch/
  s3cmd the startup script every night. (lib/scripts/pm2-init.sh via https://github
  .com/Unitech/PM2/blob/master/ADVANCED_README.md#startup-script)

postgres
  nagios
  https://wiki.postgresql.org/wiki/Automated_Backup_on_Linux then s3cmd to copy to s3, commit pg_backup.config to git


s3
  fiftytwo-git
  fiftytwo-postgres
  fiftytwo-elasticsearch
  fiftytwo-securitycameras
  
security cameras are running on the host, set them up to:
  nagios, send logs to logstash
  s3cmd sync mpgs to s3
  mysql
     nagios
     log to logstash
     auto backup to s3!
     
automatic updates
  apt-get install fail2ban
  apt-get install unattended-upgrades
    vim /etc/apt/apt.conf.d/10periodic
        APT::Periodic::Update-Package-Lists "1";
        APT::Periodic::Download-Upgradeable-Packages "1";
        APT::Periodic::AutocleanInterval "7";
        APT::Periodic::Unattended-Upgrade "1";
    vim /etc/apt/apt.conf.d/50unattended-upgrades
        Unattended-Upgrade::Allowed-Origins {
                "Ubuntu lucid-security";
        //      "Ubuntu lucid-updates";
        };
  apt-get install logwatch  
    vim /etc/cron.daily/00logwatch
        /usr/sbin/logwatch --output mail --mailto test@gmail.com --detail high

ops domain is fiftytwo.net = get a wildcard ssl cert.

route53 for DNS.
  
encrypted, offsite backups

fileserver.

dev and production environments.