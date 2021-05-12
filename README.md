# Motion Controller using Color Segmentation

The aim of this project is to design and implement a motion controller and keep its cost minimal. To achieve that, color based segmentation is used for tracking the controller. The controller is made of a pen and a plastic ball.

<a href="#">[ Project Prototype Link ]</a>

## The Controller:

This controller is simply made by sticking a pen into a hollow plastic ball.<br>
Voilà! We are done with hardware part!

<img src="https://user-images.githubusercontent.com/12862695/117965160-1239f880-b340-11eb-904b-ce70e8aad235.jpg" width=450px>

## Color Segmentation:

Basic implementation of color segmentation, and later taking mean of segmented area to get the pin point position of controller on XY plane.

<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117957012-3e04b080-b337-11eb-84f8-93ed9f4e3722.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117957022-3fce7400-b337-11eb-84e8-375a089cce26.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117964051-c9357480-b33e-11eb-82cf-110e9498c820.png" width=220px>
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117964216-fbdf6d00-b33e-11eb-8ad1-7d00780194f9.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117964296-0f8ad380-b33f-11eb-8e32-323937744f8b.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117964299-10bc0080-b33f-11eb-8047-d00d7b37d66c.png" width=220px>
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117964308-144f8780-b33f-11eb-969e-1dbc8a1d8773.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117964312-1580b480-b33f-11eb-8811-ea706ae9e7c2.png" width=220px>
<img src="https://user-images.githubusercontent.com/12862695/117964314-16b1e180-b33f-11eb-9235-718214e6f996.png" width=220px>
</p>

## Painting Test:
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117965412-5b8a4800-b340-11eb-8940-5a0d54511aff.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117965419-5d540b80-b340-11eb-900c-6d2817585c0a.png" width=300px>
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117965426-5f1dcf00-b340-11eb-820d-cdb1be78ffe6.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117965430-604efc00-b340-11eb-93d3-5693865cd217.png" width=300px>
</p>

## Aim Approximation:

This technique enables players to have laser pointer style input without any extra hardware requirement, but it requires to fix the distance between display and the player.

<img src="https://user-images.githubusercontent.com/12862695/117966830-fd5e6480-b341-11eb-8489-23f006f98fe5.png" width=700px>
<img src="https://user-images.githubusercontent.com/12862695/117967153-5b8b4780-b342-11eb-80be-5f721dc0e191.png" width=400px>

<br>

<b>Results</b>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117967514-c472bf80-b342-11eb-986b-c946b27c0c80.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117967519-c63c8300-b342-11eb-9b26-bfe4b50f9f01.png" width=300px>
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117967521-c6d51980-b342-11eb-999d-eee540817ecf.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117967523-c6d51980-b342-11eb-99b9-00a7b435465d.png" width=300px>
</p>

## Z-Axis Estimation:

Area of segmented region is used to estimate position on Z-Axis. Very unstable but works.

In below examples, a 3D ball is simulated whose coordinate in XYZ  space is estimated based on the controller input. XY position is calculated simply by taking mean of segmented region. Position on Z-axis is estimated based pixels of segmented region, that is higher number of pixels of segmented region suggests the controller is closer to the display and lower number of pixels in segmented region suggests the controller is far from the display. 

<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117968260-9e015400-b343-11eb-8fac-efb4d788cf9c.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117968269-9f328100-b343-11eb-9d86-7b5a1d6c461c.png" width=300px>
</p>
<p float="left">
<img src="https://user-images.githubusercontent.com/12862695/117968274-a0fc4480-b343-11eb-8f41-f2c6c1d301ed.png" width=300px>
<img src="https://user-images.githubusercontent.com/12862695/117968277-a194db00-b343-11eb-8175-72b45abc41e2.png" width=300px>
</p>

## Notes:
p5.js graphics library is used for graphics simulation purposes in this project.