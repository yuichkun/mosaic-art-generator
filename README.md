# Mosaic Art Generator

TBD

## Memo

### Prerequisites

- Target Image
- Material Images

### Preparation

1. Gather Images for a target image/material images.
1. Compress Material images to 40x40
1. Analyze Material images
    1. Get list of material images
    1. For each image, calculate the average color vector
    1. Save the calculated color vector as hashmap
1. Analyze the Target Image
    1. Divide the target image into blocks
    1. For each block, calculate the average color vector
    1. Save the calculated color vector for each block
1. Generate
    1. Given pre-analyzed material images and a target image,
    1. For each block of the target image,
    1. Calculate the fittest image for the block from the material images
