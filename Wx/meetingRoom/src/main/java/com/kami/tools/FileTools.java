package com.kami.tools;

import java.io.*;
import java.util.*;

/**
 * Created by shidian on 2016/12/1.
 */

public class FileTools {
    public static FileTools filetools;
    List<String> rooms = new LinkedList<String>();//to store the info in the memorroy

    String basePath = null;

    public FileTools(String basePath){
        this.basePath = basePath;
    }

    public FileTools(){
        //maybe some absolute dir
    }

    public static  FileTools getInstance(){
        if (filetools==null){
            synchronized (FileTools.class){
                if (filetools==null)
                    filetools = new FileTools();
            }
        }
        return  filetools;
    }

    public void setBasePath(String path){
        basePath = path;
    }

    public void init(String fileName){
        //获取数据
        if (rooms.size()>0) return;
        String content = readFile(basePath,fileName);
        if (content!=null){
            StringTokenizer st = new StringTokenizer(content,"\n");
            while (st.hasMoreTokens()){
                rooms.add(st.nextToken());
            }
        }

    }

    public String readFile(String path, String fileName) {

        String dir = path==null?basePath:path + File.separator +"resource" + File.separator +"db" + File.separator +  fileName;
        File file = new File(dir);
        if (file.exists()){
            BufferedReader bufferedReader = null;
            char[] buffers = null;
            try {
                bufferedReader = new BufferedReader(new InputStreamReader(new FileInputStream(file.getAbsolutePath()),"utf-8"));
                buffers = new char[(int)file.length()];
                bufferedReader.read(buffers);
            } catch (Exception e) {
                e.printStackTrace();
            }
            finally {
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    System.out.println("File " + file.getName() + " close failed");
                    //e.printStackTrace();
                }
            }
            return  new String(buffers);
        }
        else {
            System.out.println("File " + dir + ": not found.");
            return null;
        }
    }

    public List<Position> searchRoom(String name){
        List<Position> positions = new ArrayList<Position>();
        Iterator<String> it = rooms.iterator();
        while (it.hasNext()){
            String temp = it.next();
            if (temp.contains(name)){
                positions.add(getPosition(temp));
            }
        }
        return  positions;
    }

    public Position getPosition(String info){
        Position postion = new Position();
        //here we delete some useless info of the src file to make it easier, but it not advocate
        info = info.replace(" ", "");
        StringTokenizer st = new StringTokenizer(info, "\t");
        if (st.hasMoreTokens()){
            postion.setNameEn(st.nextToken());
            postion.setNameCn(st.nextToken());
            postion.setPath(st.nextToken());
            postion.setTop(Float.parseFloat(st.nextToken()));
            postion.setLeft(Float.parseFloat(st.nextToken()));
            postion.setWidth(Float.parseFloat(st.nextToken()));
            postion.setHeight(Float.parseFloat(st.nextToken()));
            postion.setBuilding(st.nextToken().replace("\r",""));
        }
        return  postion;
    }

    public static void main(String[] args){
        FileTools fileTools = FileTools.getInstance();
        fileTools.setBasePath("C:\\Users\\shidian\\KAMI_WORKSPACE");
        fileTools.init("roomPosData.txt");
        List<Position> lists = fileTools.searchRoom("北京");
        for (Position temp:
             lists) {
            System.out.println(temp.toString());
        }
    }


}
