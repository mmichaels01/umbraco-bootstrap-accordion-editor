# Umbraco Bootstrap Accordion

Easily create bootstrap accordions in the Umbraco Grid Editor

---

## Installation

### Install to your project via Nuget

[Nuget Project](https://www.nuget.org/packages/UmbracoBootstrapAccordion/1.1.0)

### Usage

Add the Bootstrap Accordion editor to the Grid Data Type of your choice by selecting a row configuration, and allowing all editors or adding the "Bootstrap Accordion" editor for the desired row.

![Image](http://i.imgur.com/U4CY4vA.png)


Add the bootstrap accordion editor to a row in the grid editor:

![Panel](http://i.imgur.com/VOB1FOV.png)

### Setting accordion groups

Set the accordion parent value as a CSS selector for a common ancestor of the collapsible panels you wish to be grouped as an accordion.
This works by setting the data-parent attribute on the collapsible panel. Please ensure the parent target has the panel grouping class applied.

Example element structure: [Example](http://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_collapsible_accordion&stacked=h)

---

## Building from source


This project was built using the umbraco yeoman generator.

Please view this project if you wish to modify the source of this project: [Github](https://github.com/warrenbuckley/generator-umbraco)

