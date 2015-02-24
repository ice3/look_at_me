#!/usr/bin/env python
# -*- coding: utf-8 -*-
 
from setuptools import setup, find_packages
from pip.req import parse_requirements

install_reqs = parse_requirements('requirements.txt')
reqs = [str(ir.req) for ir in install_reqs]
 
setup(
    name='look_at_me',
    version=execfile("./look_at_me/__version__.py"),
    packages=find_packages(),
    author="ice3",
    #author_email=" ",
    description="Draw your variables and control them, from the browser",
    long_description=open('Readme.md').read(),
    install_requires=reqs,
    include_package_data=True,
    url='http://github.com/ice3/look_at_me',
    classifiers=[
        "Programming Language :: Python",
        "Development Status :: 1 - Planning",
        "License :: OSI Approved",
        "Natural Language :: French",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 2.7",
        "Topic :: Communications",
    ],
    entry_points = {
        'console_scripts': [
            'look_at_me-server = look_at_me.gateway.app:main',
        ],
    },

    # license="WTFPL",
    )