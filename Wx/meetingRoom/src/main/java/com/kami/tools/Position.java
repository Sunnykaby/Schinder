package com.kami.tools;

/**
 * Created by shidian on 2016/12/1.
 */

public class Position {
    private String nameCn;
    private String nameEn;
    private String path;
    private float top;
    private float left;
    private float width;
    private float height;
    private String building;

    public Position() {
        this.top = 0;
        this.left = 0;
        this.width = 0;
        this.height = 0;
    }

    public Position(String nameCn, String nameEn, String path, float top, float left, float width, float height, String building) {
        this.nameCn = nameCn;
        this.nameEn = nameEn;
        this.path = path;
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this.building = building;
    }

    public String getNameCn() {return nameCn;}

    public void setNameCn(String nameCn) { this.nameCn = nameCn;}

    public String getNameEn() {return nameEn;}

    public void setNameEn(String nameEn) { this.nameEn = nameEn;}

    public String getPath() {return path;}

    public void setPath(String path) { this.path = path;}

    public float getTop() {return top;}

    public void setTop(float top) { this.top = top;}

    public float getLeft() {return left;}

    public void setLeft(float left) { this.left = left;}

    public float getWidth() {return width;}

    public void setWidth(float width) { this.width = width;}

    public float getHeight() {return height;}

    public void setHeight(float height) { this.height = height;}

    public String getBuilding() {return building;}

    public void setBuilding(String building) { this.building = building;}

    @Override
    public String toString() {
        return "Position{" +
                "nameCn='" + nameCn + '\'' +
                ", nameEn='" + nameEn + '\'' +
                ", path='" + path + '\'' +
                ", top=" + top +
                ", left=" + left +
                ", width=" + width +
                ", height=" + height +
                ", building='" + building + '\'' +
                '}';
    }
}
