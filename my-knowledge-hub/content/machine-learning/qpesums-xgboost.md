# 結合 QPESUMS 雷達回波與 XGBoost 之淹水預估

> **Summary**: 展示利用 QPESUMS 雷達降雨數據搭配 SMOTE 與 XGBoost 演算法之即時淹水預測模型。

## 1. 訓練評估指標 (Model Metrics)

| 評估指標 (Metric) | 數值 (Score) | 備註說明 |
|---|---|---|
| **Precision** | 0.87 | 正確預測淹水事件比例 |
| **Recall** | 0.91 | 成功捕捉極端淹水比例 |
| **F1-Score** | 0.89 | 調和平均數 |
| **ROC-AUC** | 0.94 | 整體分類鑑別度 |

## 2. 關鍵實作程式碼 (Colab Snippet)
```python
import xgboost as xgb
from imblearn.over_sampling import SMOTE

# 不平衡數據處理
smote = SMOTE(random_state=42)
X_res, y_res = smote.fit_resample(X_train, y_train)

# XGBoost 訓練
model = xgb.XGBClassifier(n_estimators=100, learning_rate=0.05)
model.fit(X_res, y_res)
```
