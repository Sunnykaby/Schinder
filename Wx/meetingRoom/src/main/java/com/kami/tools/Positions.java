package com.kami.tools;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by shidian on 2016/12/5.
 */

public class Positions {
    List<Position> positions;

    public void setPositions(List positions){
        this.positions = new ArrayList<Position>(positions);
    }

    public List<Position> getPositions(){
        return  this.positions;
    }


}
