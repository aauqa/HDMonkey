FasdUAS 1.101.10   ��   ��    k             l    
 ����  O    
  	  I   	������
�� .miscactvnull��� ��� null��  ��   	 m      
 
                                                                                  OPIM  alis    �  Macintosh HD               ʵ*�H+   �xMicrosoft Outlook.app                                           �ȚW�        ����  	                Microsoft Office 2011     ʵ�      Ț�F     �x   _  GMacintosh HD:Applications: Microsoft Office 2011: Microsoft Outlook.app   ,  M i c r o s o f t   O u t l o o k . a p p    M a c i n t o s h   H D  8Applications/Microsoft Office 2011/Microsoft Outlook.app  / ��  ��  ��        l    ����  I    �� ���� 0 
menu_click     ��  J           m       �    O u t l o o k      m       �    E d i t   ��  m       �    S e l e c t   A l l��  ��  ��  ��  ��        l     ��������  ��  ��        l     ��������  ��  ��       !   l     ��������  ��  ��   !  " # " l     ��������  ��  ��   #  $ % $ l     �� & '��   & 1 + `menu_click`, by Jacob Rus, September 2006    ' � ( ( V   ` m e n u _ c l i c k ` ,   b y   J a c o b   R u s ,   S e p t e m b e r   2 0 0 6 %  ) * ) l     �� + ,��   +       , � - -    *  . / . l     �� 0 1��   0 I C Accepts a list of form: `{"Finder", "View", "Arrange By", "Date"}`    1 � 2 2 �   A c c e p t s   a   l i s t   o f   f o r m :   ` { " F i n d e r " ,   " V i e w " ,   " A r r a n g e   B y " ,   " D a t e " } ` /  3 4 3 l     �� 5 6��   5 K E Execute the specified menu item.  In this case, assuming the Finder     6 � 7 7 �   E x e c u t e   t h e   s p e c i f i e d   m e n u   i t e m .     I n   t h i s   c a s e ,   a s s u m i n g   t h e   F i n d e r   4  8 9 8 l     �� : ;��   : I C is the active application, arranging the frontmost folder by date.    ; � < < �   i s   t h e   a c t i v e   a p p l i c a t i o n ,   a r r a n g i n g   t h e   f r o n t m o s t   f o l d e r   b y   d a t e . 9  = > = l     ��������  ��  ��   >  ? @ ? i      A B A I      �� C���� 0 
menu_click   C  D�� D o      ���� 0 mlist mList��  ��   B k     T E E  F G F q       H H �� I�� 0 appname appName I �� J�� 0 topmenu topMenu J ������ 0 r  ��   G  K L K l     ��������  ��  ��   L  M N M l     �� O P��   O   Validate our input    P � Q Q &   V a l i d a t e   o u r   i n p u t N  R S R Z     T U���� T A      V W V n     X Y X 1    ��
�� 
leng Y o     ���� 0 mlist mList W m    ����  U R    �� Z��
�� .ascrerr ****      � **** Z m   
  [ [ � \ \ 8 M e n u   l i s t   i s   n o t   l o n g   e n o u g h��  ��  ��   S  ] ^ ] l   ��������  ��  ��   ^  _ ` _ l   �� a b��   a ; 5 Set these variables for clarity and brevity later on    b � c c j   S e t   t h e s e   v a r i a b l e s   f o r   c l a r i t y   a n d   b r e v i t y   l a t e r   o n `  d e d r    + f g f l    h���� h n     i j i 7  �� k l
�� 
cobj k m    ����  l m    ����  j o    ���� 0 mlist mList��  ��   g J       m m  n o n o      ���� 0 appname appName o  p�� p o      ���� 0 topmenu topMenu��   e  q r q r   , ; s t s l  , 9 u���� u n   , 9 v w v 7 - 9�� x y
�� 
cobj x m   1 3����  y l  4 8 z���� z n  4 8 { | { 1   6 8��
�� 
leng | o   4 6���� 0 mlist mList��  ��   w o   , -���� 0 mlist mList��  ��   t o      ���� 0 r   r  } ~ } l  < <��������  ��  ��   ~   �  l  < <�� � ���   � A ; This overly-long line calls the menu_recurse function with    � � � � v   T h i s   o v e r l y - l o n g   l i n e   c a l l s   t h e   m e n u _ r e c u r s e   f u n c t i o n   w i t h �  � � � l  < <�� � ���   � > 8 two arguments: r, and a reference to the top-level menu    � � � � p   t w o   a r g u m e n t s :   r ,   a n d   a   r e f e r e n c e   t o   t h e   t o p - l e v e l   m e n u �  ��� � O  < T � � � n  @ S � � � I   A S�� ����� 0 menu_click_recurse   �  � � � o   A B���� 0 r   �  ��� � l  B O ����� � n  B O � � � l  L O ����� � 4   L O�� �
�� 
menE � o   M N���� 0 topmenu topMenu��  ��   � n  B L � � � l  I L ����� � 4   I L�� �
�� 
mbri � o   J K���� 0 topmenu topMenu��  ��   � n  B I � � � l 	 F I ����� � l  F I ����� � 4   F I�� �
�� 
mbar � m   G H���� ��  ��  ��  ��   � l  B F ����� � 4   B F�� �
�� 
prcs � o   D E���� 0 appname appName��  ��  ��  ��  ��  ��   �  f   @ A � m   < = � ��                                                                                  sevs  alis    �  Macintosh HD               ʵ*�H+     :System Events.app                                                ���j        ����  	                CoreServices    ʵ�      �3�       :   -   ,  =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��  ��   @  � � � l     ��������  ��  ��   �  ��� � i     � � � I      �� ����� 0 menu_click_recurse   �  � � � o      ���� 0 mlist mList �  ��� � o      ���� 0 parentobject parentObject��  ��   � k     H � �  � � � q       � � �� ��� 0 f   � ������ 0 r  ��   �  � � � l     ��������  ��  ��   �  � � � l     �� � ���   � , & `f` = first item, `r` = rest of items    � � � � L   ` f `   =   f i r s t   i t e m ,   ` r `   =   r e s t   o f   i t e m s �  � � � r      � � � n      � � � 4    �� �
�� 
cobj � m    ����  � o     ���� 0 mlist mList � o      ���� 0 f   �  � � � Z   " � ����� � ?     � � � n   
 � � � 1    
��
�� 
leng � o    ���� 0 mlist mList � m   
 ��  � r     � � � l    ��~�} � n     � � � 7  �| � �
�| 
cobj � m    �{�{  � l    ��z�y � n    � � � 1    �x
�x 
leng � o    �w�w 0 mlist mList�z  �y   � o    �v�v 0 mlist mList�~  �}   � o      �u�u 0 r  ��  ��   �  � � � l  # #�t�s�r�t  �s  �r   �  � � � l  # #�q � ��q   � < 6 either actually click the menu item, or recurse again    � � � � l   e i t h e r   a c t u a l l y   c l i c k   t h e   m e n u   i t e m ,   o r   r e c u r s e   a g a i n �  ��p � O   # H � � � Z   ' G � ��o � � =  ' , � � � n  ' * � � � 1   ( *�n
�n 
leng � o   ' (�m�m 0 mlist mList � m   * +�l�l  � I  / 7�k ��j
�k .prcsclicuiel    ��� uiel � n  / 3 � � � 4   0 3�i �
�i 
menI � o   1 2�h�h 0 f   � o   / 0�g�g 0 parentobject parentObject�j  �o   � n  : G � � � I   ; G�f ��e�f 0 menu_click_recurse   �  � � � o   ; <�d�d 0 r   �  ��c � l  < C ��b�a � n  < C � � � l  @ C ��`�_ � 4   @ C�^ �
�^ 
menE � o   A B�]�] 0 f  �`  �_   � n  < @ � � � l  = @ ��\�[ � 4   = @�Z �
�Z 
menI � o   > ?�Y�Y 0 f  �\  �[   � o   < =�X�X 0 parentobject parentObject�b  �a  �c  �e   �  f   : ; � m   # $ � ��                                                                                  sevs  alis    �  Macintosh HD               ʵ*�H+     :System Events.app                                                ���j        ����  	                CoreServices    ʵ�      �3�       :   -   ,  =Macintosh HD:System: Library: CoreServices: System Events.app   $  S y s t e m   E v e n t s . a p p    M a c i n t o s h   H D  -System/Library/CoreServices/System Events.app   / ��  �p  ��       �W � � � ��W   � �V�U�T�V 0 
menu_click  �U 0 menu_click_recurse  
�T .aevtoappnull  �   � **** � �S B�R�Q � ��P�S 0 
menu_click  �R �O ��O  �  �N�N 0 mlist mList�Q   � �M�L�K�J�M 0 mlist mList�L 0 appname appName�K 0 topmenu topMenu�J 0 r   � 	�I [�H ��G�F�E�D�C
�I 
leng
�H 
cobj
�G 
prcs
�F 
mbar
�E 
mbri
�D 
menE�C 0 menu_click_recurse  �P U��,m 	)j�Y hO�[�\[Zk\Zl2E[�k/E�Z[�l/E�ZO�[�\[Zm\Z��,2E�O� )�*�/�k/�/�/l+ U � �B ��A�@ � ��?�B 0 menu_click_recurse  �A �> ��>  �  �=�<�= 0 mlist mList�< 0 parentobject parentObject�@   � �;�:�9�8�; 0 mlist mList�: 0 parentobject parentObject�9 0 f  �8 0 r   � �7�6 ��5�4�3�2
�7 
cobj
�6 
leng
�5 
menI
�4 .prcsclicuiel    ��� uiel
�3 
menE�2 0 menu_click_recurse  �? I��k/E�O��,k �[�\[Zl\Z��,2E�Y hO� "��,k  ��/j Y )���/�/l+ U � �1 �0�/�.
�1 .aevtoappnull  �   � ****  k         �-�-  �0  �/      
�,   �+
�, .miscactvnull��� ��� null�+ 0 
menu_click  �. � *j UO*���mvk+ ascr  ��ޭ