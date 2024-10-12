
# Web Development Project 4 - *Harvard Art Explorer*

Submitted by: **Ali Ramazani**

This web app: **Harvard Art Explorer** allows users to explore various artworks from the Harvard Art Museums' collection. By clicking a button, users can fetch random pieces of art and view specific attributes such as the title, artist, and date of creation. The app ensures that only one artwork is displayed at a time and provides a feature to ban certain attributes from future results. Additionally, users can add multiple types of attributes to the ban list and view a history of previously viewed items during their session.

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [✔️] **Clicking a button creates a new API fetch request and displays at least three attributes from the returned JSON data**
- [✔️] **Only one item/API call is viewable at a time**
- [✔️] **API calls appear random to the user**
- [✔️] **At least one image is displayed per API call**
- [✔️] **Clicking on a displayed value for one attribute adds it to a displayed ban list**
  - [✔️] To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes
- [✔️] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**

The following **optional** features are implemented:

- [ ] Multiple types of attributes can be added to the ban list
- [✔️] Users can see a stored history of their previously viewed items from their session


## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='demo.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ...  

[ScreenToGif](https://www.screentogif.com/)


## Notes

#Describe any challenges encountered while building the app.

The main challenge was to implement the ban list feature. I had to make sure that the ban list is updated correctly and the API call is made again if the ban list is not empty.

Additionally, the API key is exposed to the user, which is not ideal. However, I did not find a way to hide it in the client-side code as the API provider seems to have disabled CORS.

## License

    Copyright [2024] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
