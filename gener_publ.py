#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Fri Jul  7 17:04:11 2023

@author: sand-jrd
"""
# import the requests package and set your token in a variable for later use
import requests

token="MPO6caNhGOjkCeT7ebkh8GyksYnbOeDfzb0hpiZk"

from urllib.parse import urlencode, quote_plus

# accented letters, special characters, and spaces need to be encoded
query = {"q": "author:Juillard"}

encoded_query = urlencode(query)
print(encoded_query)

# note that the colon (:) may be encoded, depending on the algorithm you use. Your request 
# should accept either the unencoded colon (:) or the encoded version (%3A)

encoded_query = urlencode({"q": "author:Juillard, Sandrine",
                           "fl": "title, author, bibcode, year",
                           "rows": 6
                          })
results = requests.get("https://api.adsabs.harvard.edu/v1/search/query?{}".format(encoded_query), \
                       headers={'Authorization': 'Bearer ' + token})

# format the response in a nicely readable format
print("hello")
print(results.json()['response']['docs'])

pub_list = []

for ii in [2,1,4,6] :
     pub_list.append(results.json()['response']['docs'])

with open("publication.json", "w") as outfile:
    outfile.write(str(pub_list))