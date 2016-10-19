package com.kami.domino;


import lotus.domino.Agent;
import lotus.domino.AgentBase;
import lotus.domino.AgentContext;
import lotus.domino.Database;
import lotus.domino.DocumentCollection;
import lotus.domino.NotesException;
import lotus.domino.Session;

public class DominoConnector extends AgentBase{
	
	private void scanFiledFromDB(Database db){
    	try {
			String title = db.getTitle();
			if (!db.open()) {
				System.out.println("The database is not open yet");
				return ;
			}
			
			if (db.isFTIndexed()) {
				System.out.println("FT is ok");
			}
			else System.out.println("FT is out of working");
//			DocumentCollection documentCollection = db.FTSearch(arg0, arg1)
			DocumentCollection documentCollection = db.search("Resources");
			if (documentCollection!=null) {
				System.out.println(documentCollection);
			}
		} catch (NotesException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    }
	
	public void NotesMain(){
		Session session = getSession();
		try {
			AgentContext agentContext = session.getAgentContext();
			Database database = session.getDatabase("CNSCNNN4/SCHINDLER", "Scn\\CNResource.nsf");
			System.out.println(database.getFileName());
			Agent agent = agentContext.getCurrentAgent();
			Dominoconnect currentConnect = new Dominoconnect();
			this.scanFiledFromDB(database);
		} catch (NotesException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	public static void main(String[] args){
		DominoConnector dominoConnector = new DominoConnector();
		dominoConnector.NotesMain();
	}
}
