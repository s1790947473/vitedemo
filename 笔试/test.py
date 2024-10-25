import re
# 正则学习
# 1.匹配模式
# 2.匹配模式测试

"""   
\d      数字    
\w      字母或数字 _
\s      包括空格、回车等字符
\D      非数字
\W      非单词
\S      非空格
.       任意字符，不包括换行

*       任意个字符  
+       至少一个字符  
?       0个或1个字符 多用与控制贪婪匹配 如 re.match(r'^(\d+?)(0*)$', '102300').groups()     ('1023', '00')
^       匹配行首
$       匹配行尾
{n}     n个字符   
{n,m}   n-m个字符  m可省略
(cat|dog)   |表示或   ()表示整体
[abc]+  限定abc三个字母
[^0-9]+  匹配非0-9的字符
"""
p = r'^[a-z|A-Z|\S]+@[a-z|A-Z]+\.com '
pattern = r'^[\w\.\-#]+@[\w\.-]+\.\w+$'

# pattern =r'^\d+-\d+-\d+$'
# print(bool(re.match(pattern, 'avcsadASD#@exap.com')))

def L(nums,i):
# """Returns the length of longest increasing subsequence starting from i"""
    if i==len(nums)-1:          # last number
        return 1
    max_len = 1
    for j in range(i + 1,len(nums)):
        if nums[j] > nums[i]:
            max_len = max(max_len,L(nums,j) + 1)
    return max_len

def length_of_LIS(nums):
    return max(L(nums,i)for i in range(len(nums)))
nums=[1,8,3,6,2]
print(length_of_LIS(nums))