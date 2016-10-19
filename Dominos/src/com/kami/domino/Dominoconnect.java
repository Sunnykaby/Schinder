package com.kami.domino;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.util.Vector;

import com.sun.org.apache.regexp.internal.recompile;

import lotus.domino.*;
import sun.print.resources.serviceui;

/**
 * key="notesServer" value="CNSCNNN4/SCHINDLER" 
	key="notesDB" value="Scn\CNResource.nsf"  
 * @author shidian
 *
 */
public class Dominoconnect {

	private boolean getDominoConenct(){
		try{
			NotesThread currentThread = new NotesThread(new Runnable() {

				@Override
				public void run() {
					// TODO Auto-generated method stub
					Session session;
					try {
						session = NotesFactory.createSession("");

						if (session == null) {
							return ;
						}
						else {
							System.out.println(session.getCommonUserName());
						}

					} catch (NotesException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			});
			currentThread.run();

		}
		catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	  /**
     * 遍历文档
     * @param db Database
     */
    public void selectDoc(Database db) {
        DocumentCollection docList = null;
        try {
            docList = db.getAllDocuments();
            if (docList != null) {
                System.out.println("database : " + db.getTitle() + " is " +
                                   ((int) (db.getSize() / 1024)) +
                                   "KB long and has " + docList.getCount() +
                                   " documents");
                Document doc = docList.getFirstDocument();
                while (doc != null) {
//                     System.out.println("=============name1="+doc.getItemValueString("name1"));
                    Vector items = doc.getItems();
                    for (int j = 0; j < items.size(); j++) {
                        Item item = (Item) items.elementAt(j);

                        if (item != null && item.getType() == 1280) { //表示是文本
                            System.out.println("\t" + item.getName() +
                                               "    =    \"" +
                                               item.getValueString() + "\"");
                        } else if (item != null && item.getType() == 1024) { //表示是时间
                            System.out.println("\t" + item.getName() +
                                               "    =    \"" +
                                               item.getDateTimeValue() + "\"");
                        } else if (item != null && item.getType() == 768) { //表示是整型
                            System.out.println("\t" + item.getName() +
                                               "    =    \"" +
                                               item.getValueInteger() + "\"");
                        } else if (item != null && item.getType() == 1) { //表示是rtf域
                            Item itmWjbt = doc.getFirstItem("$FILE");
                            if (itmWjbt != null) {
                                EmbeddedObject eo = doc.getAttachment(itmWjbt.
                                        getValueString());
                                FileOutputStream out = new FileOutputStream(
                                        "C:/" +
                                        itmWjbt.
                                        getValueString());

                                InputStream in = eo.getInputStream();
                                BufferedInputStream bufferedInputStream = new
                                        BufferedInputStream(in);
                                BufferedOutputStream bufferedOutputStream = new
                                        BufferedOutputStream(out);

                                byte[] data = new byte[1];
                                while (bufferedInputStream.read(data) != -1) {
                                    bufferedOutputStream.write(data);
                                }
                                //将缓冲区中的数据全部写出
                                bufferedOutputStream.flush();
                                //关闭流
                                bufferedInputStream.close();
                                bufferedOutputStream.close();
                            }
                        }
                    }
                    System.out.println("---------------------");
                    doc.recycle();
                    doc = docList.getNextDocument();
                }
            }

        } catch (NotesException ex) {
            ex.printStackTrace();
        } catch (Exception ex1) {ex1.printStackTrace();}
    }

    /**
     * 插入一个文档
     * @param db Database
     */
    public void insertDoc(Database db) {
        //插入一条Document//////////////////
        Document newDoc = null;
        try {
            newDoc = db.createDocument();
            newDoc.appendItemValue("Form", "form1"); //指定表单
            newDoc.appendItemValue("name1", "hello");
            newDoc.appendItemValue("name2", "2008-04-11");
            newDoc.appendItemValue("name3", "100");
            RichTextItem rti = (RichTextItem) newDoc.createRichTextItem(
                    "name4");
            String attachFilePath = "D:/测试.doc";
            rti.embedObject(EmbeddedObject.EMBED_ATTACHMENT, null,
                            attachFilePath, attachFilePath); // 添加附件
            if (newDoc.save()) {
                System.out.println("文档创建并保存成功");
            } else {
                System.out.println("文档创建并保存失败");
            }
        } catch (NotesException ex) {
            ex.printStackTrace();
        }
        ///////////////////////////////////////
    }
    
    private void scanFiledFromDB(Database db){
    	try {
			String title = db.getTitle();
			if (!db.isOpen()) {
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

	public static void main(String[] args){
		//		Dominoconnect temp = new Dominoconnect();
		//		temp.getDominoConenct();
//		StringBuffer a = new StringBuffer();
//		a.append("ABV");
//		a.reverse();
//		System.out.println(a);
		try {
			NotesThread.sinitThread(); // start thread  
			Session s = NotesFactory.createSession((String)null,(String)null,"Kami123@");
//			NotesFactory.createS
			System.out.println(s.getCommonUserName());
			System.out.println(s.getServerName());
			System.out.println(s.verifyPassword("Dianyue Shi", "Kami123@"));
			Database database =s.getDatabase("CNSCNNN4/SCHINDLER", "Scn\\CNResource.nsf");
//			s.getD
			System.out.println(database.getFileName());
			if (!database.isOpen()) {
				database.open();
			}
			DocumentCollection temp = database.getAllDocuments();
			System.out.println(database.getAllReadDocuments());
			Dominoconnect currentConnect = new Dominoconnect();
			currentConnect.scanFiledFromDB(database);
			s.recycle();//is object is not used any more, should call this method
		} catch (NotesException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		finally{
			NotesThread.stermThread();
			
		}
	}
}


