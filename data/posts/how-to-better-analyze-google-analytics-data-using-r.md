---
name: How to better analyze Google Analytics data using R
date: "2017-09-12"
image: ./Blog-AnalyticsR.jpg
author: Susana Ramallo
social_summary: Google Analytics has very friendly interfaces through which we can have a first approximation of the behavior of users.
---
We are currently faced with the great speed at with which events occur in the digital world.
The most powerful tool to react to that endless race is **knowledge**.

When talking about a website, in order to be able to effectively carry out continuous improvements, we need to know our users, their behavior, and their preferences.
For this purpose, we have a great ally: Google Analytics. This tool allows us to gain that knowledge.
It has very friendly interfaces through which we can have a first approximation of the behavior of the users.

But what if we want to go further?
We can use this powerful tool to extract data, analyze it and convert it into information.
We made a little analysis trying to get ourselves to handle the data flow to which we had access.
We chose R as a tool for statistical analysis and graphs. The same information can be used to make reports and export them in different formats.

All the research was done using RStudio, we selected the `googleAnalyticsR` package to access Google Analytics data and `ggplot2` package to graphs.

First load up these packages. 

```R
library(googleAnalyticsR)
library(ggplot2)
```

Then we need to authorize Google Analytics to access the data. 

```R
ga_auth()
```

With the authorization fulfilled we can assign the query results to a "data frame" called `ga_data`. The only thing you need to know is the ViewID assigned to your Google Analytics account.

```R
ga_data <- google_analytics_4(viewId = "*********", date_range = c(Sys.Date()-30, Sys.Date()), metrics = c("users", "sessions"), dimensions = c("date","country","city","month","year","devicecategory","continent"), anti_sample = TRUE)
```

Now in  `ga_data` we have the result of the query and we can use this in several ways.

#### Continents and Devices

```R
ggplot(data=ga_data,aes(x=continent,y=sessions,fill=devicecategory)) + geom_bar() + ggtitle("Device use by Continent") + labs(x="Continent", y="Devices") + labs(fill="Devices")
```
           
We use several parameters to define:
 - X axis = continent, Y axis = sessions and fill = devicecategory
 - geom_bar is the type of graph
 - And labs for friendlier user labels
           
![](https://densitylabs.io/system/comfy/cms/files/files/000/000/166/original/Device_Use_by_Continent.png)

#### Timeline with Continents and Devices

A new query is used to load the sessions access by continent and device as a time series

```R
ga_data_devices <- google_analytics_4(viewId = "*********",date_range = c(Sys.Date()-500, Sys.Date()), metrics = c("sessions"), dimensions = c("date","devicecategory","continent"), anti_sample = TRUE)
```

```R
ggplot(data=ga_data_devices,aes(x=date,y=continent,fill=devicecategory)) + geom_line(size=3, aes(colour=devicecategory))  + labs(colour="Devices") + xlab("Date") + ylab("Continent")
```

![](https://densitylabs.io/system/comfy/cms/files/files/000/000/167/original/Timeline_Device_by_Continent.png)


#### Relationships between Continents and Sessions

We used  `ga_data` again to show the relationship between continents and sessions, but in this case the color represents the continents.

```
qplot(date,sessions,data=ga_data,color=continent,main="Histograma")+ theme_bw() + ggtitle("Sessions by Continent") + labs(x="Date", y="Sessions", colour = "Continent") 
```
![](https://densitylabs.io/system/comfy/cms/files/files/000/000/168/original/Sessions_by_Continent.png)


#### Sessions and Users

Here are the daily sessions during August 2017. Color indicates the density of users in a new query loaded into the `ga_data_small` variable.

```
 ga_data_small <- google_analytics_4(viewId = "*********", date_range = c(Sys.Date()-30, Sys.Date()), metrics = c("users", "sessions"), dimensions = c("date"), anti_sample = TRUE)
```

```
ggplot(ga_data_small, aes(date, sessions, color=users)) + geom_line( size=2) + xlab("Date") + ylab("Daily Sessions") + theme_bw() + ggtitle("Density Labs Sessions and Users") + labs(colour= "Users")  
```
![](https://densitylabs.io/system/comfy/cms/files/files/000/000/169/original/Sessions_and_users.png)

#### Time series Sessions by Countries

In `ga_data_countries` we load the results about 300 days from today, and in `ga_data_countries_subset` we apply a range within the obtained result to only graph the cases with sessions greater than 3.

```
ga_data_countries <- google_analytics_4(viewId = "*********",date_range = c(Sys.Date()-300, Sys.Date()), metrics = c("sessions"), dimensions = c("date","country"), anti_sample = TRUE)
```

```
ga_data_countries_subset <- subset(ga_data_countries, sessions > 3)
```

```
ggplot(data=ga_data_countries_subset,aes(x=date,y=sessions, color=country)) + geom_line(size=1) + theme_bw() + theme(legend.position = "bottom", legend.direction="horizontal", legend.title = element_blank()) + ggtitle("Time series Sessions by Country") + labs(x="Date", y="Sessions")  + scale_colour_discrete()
```
![](https://densitylabs.io/system/comfy/cms/files/files/000/000/170/original/Sessions_by_country.png
)


#### Conclusions

R is a tool that has a lot of potential. It’s very robust and effective for handling statistical data and allows managing large data volumes. The limit is our imagination.

If you are interested in knowing more about this, we are at your disposal! We can develop your dreams, and make them come true together.

**If you can dream it, we can code it.**

R Core Team (2016). R: A language and environment for statistical computing. R Foundation for Statistical Computing, Vienna, Austria.
URL <https://www.R-project.org/>   
  
  [Check us out!] (https://densitylabs.io/)
