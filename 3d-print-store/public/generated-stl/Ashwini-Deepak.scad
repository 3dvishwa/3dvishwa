
word1 = "Ashwini";
word2 = "Deepak";

letterSize = 30;
letterSpacing = 5;
plateOffset = 5;
plateThickness = 3;
solidSetting = "Heart";

$fa = 1;
$fs = 0.01;

wordLength = max(len(word1), len(word2));
pythagoras = sqrt(pow(letterSize, 2) + pow(letterSize, 2));
sizeOffset = 1.4;

for (i = [0 : 1 : wordLength-1]) {
    spacing =  pythagoras + letterSpacing;
    translate([spacing*i,0,0])
    rotate([90,0,-45])
    difference() {
        difference() {
            if (word1[i] != " "  && i < len(word1)) {
                if (word2[i] == " " || i > len(word2)-1) {  
                    translate([0,0, -letterSize*sizeOffset/2+7.5])
                    linear_extrude(letterSize*sizeOffset-15) { printLetter(word1[i]); }
                } else {
                    translate([0,0, -letterSize*sizeOffset/2])
                    linear_extrude(letterSize*sizeOffset) { printLetter(word1[i]); }
                }
            }
            if ((word1[i] == " " && word2[i] == " ") || (word2[i] == " " && i > len(word1)-1)) {
                cube([letterSize*sizeOffset-15, letterSize, letterSize*sizeOffset-15], center = true);
            }
            if (word2[i] != " " && i < len(word2)) {
                rotate([0, 90, 0])
                difference() {
                    if (word1[i] != " "  && i < len(word1)) cube(letterSize*sizeOffset, center = true);
                    if (word1[i] == " " || i > len(word1)-1) {
                        translate([0,0, -letterSize*sizeOffset/2+7.5])
                        linear_extrude(letterSize*sizeOffset-15) { printLetter(word2[i]); }
                    } else {
                        translate([0,0, -letterSize*sizeOffset/2])
                        linear_extrude(letterSize*sizeOffset) { printLetter(word2[i]); }
                    }
                }
            }
        }
        if (solidSetting != "Solid") {
            if (word1[i] == " " || i > len(word1)-1) {
                translate([0,0, -letterSize*sizeOffset/2])
                linear_extrude(letterSize*sizeOffset) { makeSymbol(); }
            }
            if (word2[i] == " " || i > len(word2)-1) {
                rotate([0, 90, 0])
                translate([0,0, -letterSize*sizeOffset/2])
                linear_extrude(letterSize*sizeOffset) { makeSymbol(); }
            }
        }
    }
}

plateWidth = pythagoras * wordLength + letterSpacing * (wordLength-1);
plateDepth = pythagoras;
translate([plateWidth/2-pythagoras/2, 0, -(letterSize/2 + plateThickness/2 - 1.5)])
minkowski() {
    cube([plateWidth, plateDepth, plateThickness], center = true); 
    cylinder(r=plateOffset, h=0.0000001);
}

module printLetter(letter) {
    scaleFactor = 1-0.21666;
    if (letter == "Q") {
        text(letter, size = letterSize*scaleFactor, halign = "center", valign = "center");
    } else {
        text(letter, size = letterSize, halign = "center", valign = "center");
    }
}

module makeSymbol() {
    if (solidSetting == "Heart") {
        text("♥", size = letterSize, halign = "center", valign = "center");
    }
    if (solidSetting == "Star") {
        text("«", size = letterSize-letterSize/5, halign = "center", valign = "center", font = "Wingdings:style=Regular");
    }
}
