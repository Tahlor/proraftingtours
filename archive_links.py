""" Notes:
Password should be placed in password.txt in root directory (password cannot begin/end with whitespace)
This can (probably) be deleted after first run and cookies are obtained
"""

import requests
import time
import random
import logging
import datetime
import sys
from bs4 import BeautifulSoup
import os

def mkdir(path):
    try:
        os.mkdir(path)
    except:
        pass

sys.path.append("..")

## Logging
logger = logging.getLogger(__name__)
today = datetime.datetime.today().strftime('%Y-%m-%d')
mkdir("./logs")
logging.basicConfig(filename="./logs/{}.log".format(today),
                             filemode='a',
                             format='%(asctime)s,%(msecs)d %(name)s %(levelname)s %(message)s',
                             datefmt='%H:%M:%S',
                             level=logging.DEBUG)
logging.getLogger().addHandler(logging.StreamHandler()) # this prints log to std out if its being written
t = int(time.time() * 10e2)

## Setup session
my_session = requests.Session()
user_agent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"
my_session.headers.update({'user-agent': user_agent})

def get_domain(url):
    from urllib.parse import urlparse
    # from urlparse import urlparse  # Python 2
    parsed_uri = urlparse(url)
    result = '{uri.netloc}'.format(uri=parsed_uri)
    return result

def grab_links(html_page, main_page, local_only=True, robust=False):
    domain = get_domain(main_page)
    links = set([main_page])
    soup = BeautifulSoup(html_page, features="lxml")
    print(soup)
    tag = None if robust else 'a'
    for link in soup.findAll(tag):
        link = link.get('href')
        if link:
            if "."==link[0]:
                link = domain + link[1:]
            if domain in link or not local_only:
                if filter_link(link):
                    links.add(link)
                    logger.info(link)
    return links

def filter_link(link):
    if link[0]=="#":
        return False
    elif "mailto" in link:
        return False
    else:
        return True

def archive_links(links):
    for link in links:
        page = my_session.get(f"https://web.archive.org/save/{link}")
        logger.info(page)

if __name__=='__main__':
    #main_page = "https://proraftingtours.com"
    website_list = ["https://proraftingtours.com"]
    #website_list = "https://jimarchibald.com","https://jimarchibald.com/family/family.htm"
    
    for main_page in website_list:
        local = False if "jim" in main_page else True # only archive links on domain
        robust = True if "jim" in main_page else False # look for everything
        page = my_session.get(main_page)
        links = grab_links(page.text, main_page, local, robust)
        print(links)
        archive_links(links)
