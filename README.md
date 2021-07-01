<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Mosaic Art Generator](#mosaic-art-generator)
  - [How to Use](#how-to-use)
    - [Preparation](#preparation)
      - [Gather 2 Kinds of Images](#gather-2-kinds-of-images)
        - [Material Images](#material-images)
        - [Target Images](#target-images)
      - [Configure](#configure)
      - [Resize](#resize)
      - [Analyze](#analyze)
    - [Execution](#execution)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Mosaic Art Generator

## How to Use

### Preparation

#### Gather 2 Kinds of Images

##### Material Images

Images by which you wish to construct the target image.

Gather and place them under `./material_images/original`

##### Target Images

The target image that you wish to create by gathering material images.

Gather and place them under `./target_images/original`

#### Configure

Open `./config.json` and configure `targetImageName` which is the name of one of the target files that you put in.

#### Resize

`npm run resize`

#### Analyze

`npm run prepare`

### Execution

`npm start` will generate images under `./data` folder.

